import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from "rxjs";
import { ConsumptionUnitDto } from "../../models/consumption-unit-dto";
import { ThemeService } from "../../services/theme.service";
import { DataSelectorService } from "../../services/data-selector.service";
import { filter, first, switchMap, tap}  from "rxjs/operators";
import { ExchangeService } from "../../services/exchange.service";
import { ExchangeDto } from "../../models/exchange-dto";

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  exchangeMatrix: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>(null);
  exchangeData: BehaviorSubject<ExchangeDto[]> = new BehaviorSubject<ExchangeDto[]>(null);
  theme: string;
  loading: boolean;

  constructor(
    private themeService: ThemeService,
    private dataSelectorService: DataSelectorService,
    private exchangeService: ExchangeService,
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
      combineLatest([
            this.exchangeService.getData(),
            this.exchangeService.getMatrix(),
          ])
            .pipe(
              tap(([power, powerMatrix]) => {
                this.exchangeData.next(power);
                this.exchangeMatrix.next(powerMatrix);
              })
            )
    ])
      .subscribe();
  }

  onMatrixDateChange(dates: Date[]) {
    this.loading = true;
    this.exchangeService.getMatrix(dates[0], dates[1])
      .pipe(
        tap((activeMatrix) => this.exchangeMatrix.next(activeMatrix)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }

  onLineGraphicDateChange(dates: Date[]) {
    this.loading = true;
    this.exchangeService.getData(dates[0], dates[1])
      .pipe(
        tap((activeData) => this.exchangeData.next(activeData)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }
}
