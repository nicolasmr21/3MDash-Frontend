import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConsumptionService} from "../../services/consumption.service";

@Component({
  selector: 'app-date-range-selector',
  templateUrl: './date-range-selector.component.html',
  styleUrls: ['./date-range-selector.component.scss']
})
export class DateRangeSelectorComponent implements OnInit {

  @Output() dateEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();
  dateFrom: Date;
  dateTo: Date;

  constructor(
    private consumptionService: ConsumptionService,
  ) { }

  ngOnInit(): void {
    this.dateFrom = this.consumptionService.firstDateOfMonth;
    this.dateTo = this.consumptionService.lastDateOfMonth;
  }

  onDateToChange(newDate: Date) {
    this.dateEmitter.emit([this.dateFrom, newDate]);
  }

  onDateFromChange(newDate: Date) {
    this.dateEmitter.emit([newDate, this.dateTo]);
  }
}
