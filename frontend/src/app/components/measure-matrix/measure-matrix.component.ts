import { Component, Input, OnInit } from '@angular/core';
import { MATRIX_HEADERS } from "../../utils/app.titles";
import {map} from "rxjs/operators";
import {FilterService} from "../../services/filter.service";

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
    this.filteredData = this.groupDataByDate(this.data);
    this.filteredData.pop();
  }

  private groupDataByDate(items: string[][]): string[][] {
    const dic = new Map<string, string[]>();
    items.forEach((item) => {
      const key = item[1]?.substring(0, 10);
      dic.set(key, [...dic.get(key) || [], item[2]]);
    });
    const mapEntries = Array.from(dic.entries());
    return [...mapEntries.map((entry) => [entry[0], ...entry[1]])];
  }

  onDateChange(dates: Date[]) {
    this.filteredData = this.groupDataByDate(this.data);
    this.filteredData.pop();
    this.filteredData = this.filterService.filterDataByDate(this.filteredData, dates[0], dates[1]);
  }
}
