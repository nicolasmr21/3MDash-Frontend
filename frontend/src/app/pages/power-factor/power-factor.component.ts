import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, combineLatest} from "rxjs";
import {ConsumptionUnitDto} from "../../models/consumption-unit-dto";
import {filter, first, switchMap, tap} from "rxjs/operators";
import {ThemeService} from "../../services/theme.service";
import {DataSelectorService} from "../../services/data-selector.service";
import {ConsumptionService} from "../../services/consumption.service";

@Component({
  selector: 'app-power-factor',
  templateUrl: './power-factor.component.html',
  styleUrls: ['./power-factor.component.scss']
})
export class PowerFactorComponent implements OnInit {

  powerMatrix: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>(null);
  powerData: BehaviorSubject<ConsumptionUnitDto[]> = new BehaviorSubject<ConsumptionUnitDto[]>(null);
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
            this.consumptionService.getData(value, 'factorpower'),
            this.consumptionService.getMatrix(value, 'factorpower'),
          ])
            .pipe(
              tap(([power, powerMatrix]) => {
                this.powerData.next(power);
                this.powerMatrix.next(powerMatrix);
              })
            )),
          tap(() => this.loading = false)
        ),
    ])
      .subscribe();
  }

  onMatrixDateChange(dates: Date[]) {
    this.loading = true;
    this.consumptionService.getMatrix(this.contractId, 'factorpower', dates[0], dates[1])
      .pipe(
        tap((activeMatrix) => this.powerMatrix.next(activeMatrix)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }

  onLineGraphicDateChange(dates: Date[]) {
    this.loading = true;
    this.consumptionService.getData(this.contractId, 'factorpower', dates[0], dates[1])
      .pipe(
        tap((activeData) => this.powerData.next(activeData)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }
}
