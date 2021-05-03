import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, combineLatest} from "rxjs";
import {ConsumptionUnitDto} from "../../models/consumption-unit-dto";
import {ThemeService} from "../../services/theme.service";
import {DataSelectorService} from "../../services/data-selector.service";
import {ConsumptionService} from "../../services/consumption.service";
import {filter, first, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-excess',
  templateUrl: './excess.component.html',
  styleUrls: ['./excess.component.scss']
})
export class ExcessComponent implements OnInit {

  excessMatrix: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>(null);
  excessData: BehaviorSubject<ConsumptionUnitDto[]> = new BehaviorSubject<ConsumptionUnitDto[]>(null);
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
            this.consumptionService.getData(value, 'reactive/excess'),
            this.consumptionService.getMatrix(value, 'reactive/excess'),
          ])
            .pipe(
              tap(([excess, excessMatrix]) => {
                this.excessData.next(excess);
                this.excessMatrix.next(excessMatrix);
              })
            )),
          tap(() => this.loading = false)
        ),
    ])
      .subscribe();
  }

  onMatrixDateChange(dates: Date[]) {
    this.loading = true;
    this.consumptionService.getMatrix(this.contractId, 'reactive/excess', dates[0], dates[1])
      .pipe(
        tap((activeMatrix) => this.excessMatrix.next(activeMatrix)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }

  onLineGraphicDateChange(dates: Date[]) {
    this.loading = true;
    this.consumptionService.getData(this.contractId, 'reactive/excess', dates[0], dates[1])
      .pipe(
        tap((activeData) => this.excessData.next(activeData)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }
}
