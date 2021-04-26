import { Component, Input, OnInit } from '@angular/core';
import { MATRIX_HEADERS } from "../../utils/app.titles";
import { FilterService } from "../../services/filter.service";

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
  @Input() data: string[][];
  headers = MATRIX_HEADERS;
  filteredData: string[][];
  loading: boolean;
  options: any;

  constructor(
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.filteredData = this.data;
  }

  onDateChange(dates: Date[]) {
    this.filteredData = this.filterService.filterDataByDate(this.filteredData, dates[0], dates[1]);
  }
}
