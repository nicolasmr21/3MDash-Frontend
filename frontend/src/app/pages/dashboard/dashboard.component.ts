import {Component, OnDestroy, OnInit} from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import {filter, mergeMap, switchMap, tap} from "rxjs/operators";
import {BehaviorSubject, combineLatest} from "rxjs";
import { DataSelectorService } from "../../services/data-selector.service";
import { ConsumptionService } from 'src/app/services/consumption.service';
import { ConsumptionUnitDto } from "../../models/consumption-unit-dto";


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
    private consumptionService: ConsumptionService
  ) { }

  ngOnInit() {
    this.loading = true;
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
