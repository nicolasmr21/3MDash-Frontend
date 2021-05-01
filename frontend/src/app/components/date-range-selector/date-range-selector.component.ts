import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConsumptionService} from "../../services/consumption.service";
import {DataSelectorService} from "../../services/data-selector.service";
import {filter, switchMap, tap} from "rxjs/operators";
import {MaxMinDateDto} from "../../models/max-min-date-dto";

@Component({
  selector: 'app-date-range-selector',
  templateUrl: './date-range-selector.component.html',
  styleUrls: ['./date-range-selector.component.scss']
})
export class DateRangeSelectorComponent implements OnInit {

  @Output() dateEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();
  dateFrom: Date;
  dateTo: Date;
  dateRange: MaxMinDateDto;

  constructor(
    private consumptionService: ConsumptionService,
    private dataSelectorService: DataSelectorService,
  ) { }

  ngOnInit(): void {
    this.dataSelectorService.getContract$()
      .pipe(
        filter((value) => !!value),
        switchMap((contract) => this.consumptionService.getDataDateRange(contract)),
        tap((range) => this.dateRange = range),
        tap(() => this.generateDefaultDates())
      )
      .subscribe()
  }

  generateDefaultDates(): void {
    this.dateFrom = this.consumptionService.firstDateOfMonth;
    this.dateTo = this.consumptionService.lastDateOfMonth;
  }

  onDateToChange(newDate: Date): void {
    this.dateEmitter.emit([this.dateFrom, newDate]);
  }

  onDateFromChange(newDate: Date): void {
    this.dateEmitter.emit([newDate, this.dateTo]);
  }

  getDate(date: string): Date {
    return new Date(date);
  }
}
