import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-range-selector',
  templateUrl: './date-range-selector.component.html',
  styleUrls: ['./date-range-selector.component.scss']
})
export class DateRangeSelectorComponent implements OnInit {

  @Output() dateEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();
  dateFrom: Date;
  dateTo: Date;

  constructor() { }

  ngOnInit(): void {
    const date = new Date();
    this.dateFrom = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dateTo = new Date();
  }

  onDateToChange(newDate: Date) {
    this.dateEmitter.emit([this.dateFrom, newDate]);
  }

  onDateFromChange(newDate: Date) {
    this.dateEmitter.emit([newDate, this.dateTo]);
  }
}
