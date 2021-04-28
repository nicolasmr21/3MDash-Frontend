import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import { filter, switchMap, tap } from "rxjs/operators";
import { BehaviorSubject, combineLatest } from "rxjs";
import { DataSelectorService } from "../../services/data-selector.service";
import { ConsumptionService } from 'src/app/services/consumption.service';
import { ConsumptionUnitDto } from "../../models/consumption-unit-dto";
import { NbToastrService } from "@nebular/theme";
import { APP_NAME } from "../../utils/app.titles";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  options: any;
  theme: string;
  loading: boolean;
  activeData: BehaviorSubject<ConsumptionUnitDto[]> = new BehaviorSubject<ConsumptionUnitDto[]>(null);
  reactiveData: BehaviorSubject<ConsumptionUnitDto[]> = new BehaviorSubject<ConsumptionUnitDto[]>(null);
  activeMatrix: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>(null);

  constructor(
    private themeService: ThemeService,
    private dataSelectorService: DataSelectorService,
    private consumptionService: ConsumptionService,
    private toastService: NbToastrService,
  ) { }

  ngOnInit() {
    this.loading = true;
    if(!this.dataSelectorService.getClient() || !this.dataSelectorService.getContract()) {
      this.toastService.show('Elegir cliente y contrato para desplegar datos', APP_NAME, { status: 'info' });
    }
    this.getData();
  }

  getData(): void {
    combineLatest([
      this.themeService.getTheme$()
        .pipe(
          tap((theme) => this.theme = theme),
        ),
      this.dataSelectorService.getContract$()
        .pipe(
          filter((value) => !!value),
          tap(() => this.loading = true),
          switchMap((value) => combineLatest([
            this.consumptionService.getActiveData(value),
            this.consumptionService.getReactiveData(value),
            this.consumptionService.getActiveMatrix(value),
          ])
            .pipe(
              tap(([active, reactive, activeMatrix]) => {
                this.activeData.next(active);
                this.reactiveData.next(reactive);
                this.activeMatrix.next(activeMatrix);
              })
            )),
          tap(() => this.loading = false)
        ),
    ])
      .subscribe();
  }
}
