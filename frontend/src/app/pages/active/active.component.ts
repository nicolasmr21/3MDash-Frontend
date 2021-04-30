import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from "rxjs";
import { filter, switchMap, tap } from "rxjs/operators";
import { ConsumptionUnitDto } from "../../models/consumption-unit-dto";
import {ThemeService} from "../../services/theme.service";
import {DataSelectorService} from "../../services/data-selector.service";
import {ConsumptionService} from "../../services/consumption.service";

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
          tap(() => this.loading = true),
          switchMap((value) => combineLatest([
            this.consumptionService.getActiveData(value),
            this.consumptionService.getActiveMatrix(value),
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
}
