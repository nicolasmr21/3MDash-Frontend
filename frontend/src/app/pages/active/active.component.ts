import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from "rxjs";
import { filter, first, switchMap, tap } from "rxjs/operators";
import { ConsumptionUnitDto } from "../../models/consumption-unit-dto";
import { ThemeService} from "../../services/theme.service";
import { DataSelectorService } from "../../services/data-selector.service";
import { ConsumptionService } from "../../services/consumption.service";

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  activeMatrix: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>(null);
  activeData: BehaviorSubject<ConsumptionUnitDto[]> = new BehaviorSubject<ConsumptionUnitDto[]>(null);
  theme: string;
  loading: boolean;
  contractId: string;

  constructor(
    private themeService: ThemeService,
    private dataSelectorService: DataSelectorService,
    private consumptionService: ConsumptionService,
  ) { }

  ngOnInit(): void {
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
          tap((value) => this.contractId = value),
          tap(() => this.loading = true),
          switchMap((value) => combineLatest([
            this.consumptionService.getData(value, 'active'),
            this.consumptionService.getMatrix(value, 'active'),
          ])
            .pipe(
              tap(([active, activeMatrix]) => {
                this.activeData.next(active);
                this.activeMatrix.next(activeMatrix);
              })
            )),
          tap(() => this.loading = false)
        ),
    ])
      .subscribe();
  }

  onMatrixDateChange(dates: Date[]) {
    this.loading = true;
    this.consumptionService.getMatrix(this.contractId, 'active', dates[0], dates[1])
      .pipe(
        tap((activeMatrix) => this.activeMatrix.next(activeMatrix)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }

  onLineGraphicDateChange(dates: Date[]) {
    this.loading = true;
    this.consumptionService.getData(this.contractId, 'active', dates[0], dates[1])
      .pipe(
        tap((activeData) => this.activeData.next(activeData)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }
}
