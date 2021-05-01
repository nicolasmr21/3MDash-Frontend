import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MATRIX_HEADERS } from "../../utils/app.titles";
import { FilterService } from "../../services/filter.service";
import {Observable} from "rxjs";
import {ConsumptionUnitDto} from "../../models/consumption-unit-dto";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-measure-matrix',
  templateUrl: './measure-matrix.component.html',
  styleUrls: ['./measure-matrix.component.scss']
})
export class MeasureMatrixComponent implements OnInit {

  @Input() measure: string;
  @Input() defaultPeriod: string;
  @Input() theme: string;
  @Input() units: number;
  @Input() data$: Observable<string[][]>;
  @Input() data: string[][];

  @Output() dateEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  headers = MATRIX_HEADERS;
  filteredData: string[][];
  loading: boolean;
  options: any;

  constructor(
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.data$
      .pipe(
        filter((data) => !!data),
        tap((data) => {
          this.data = data;
          this.data[this.data.length-1][0] = 'TOTAL';
          this.filteredData = this.data;
          this.loading = false;
        }),
      )
      .subscribe();
  }

  onDateChange(dates: Date[]) {
    this.dateEmitter.emit(dates);
  }
}
