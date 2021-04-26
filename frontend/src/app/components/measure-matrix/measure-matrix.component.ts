import { Component, Input, OnInit } from '@angular/core';
import { MATRIX_HEADERS } from "../../utils/app.titles";
import {map} from "rxjs/operators";
import {FilterService} from "../../services/filter.service";
import {ConsumptionUnitDto} from "../../models/consumption-unit-dto";

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
  @Input() data: ConsumptionUnitDto[];
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

  private groupDataByDate(items: ConsumptionUnitDto[]): string[][] {
    const dic = new Map<string, string[]>();
    items.forEach((item) => {
      const key = item.dateConsumption?.substring(0, 10);
      dic.set(key, [...dic.get(key) || [], item.consumptionUnits.toString()]);
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
