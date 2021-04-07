import { Component, Input, OnInit } from '@angular/core';
import {CsvService} from "../../services/csv.service";

@Component({
  selector: 'app-active-line-graph',
  templateUrl: './active-line-graph.component.html',
  styleUrls: ['./active-line-graph.component.scss']
})
export class ActiveLineGraphComponent implements OnInit {

  @Input() theme: string;
  options: any;
  loading: boolean;

  constructor(
    private csvService: CsvService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.csvService.getActiveData().then((rawData) => {
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: rawData.map(value => value[1])
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} kWh'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: rawData.map(value => parseFloat(value[2])),
          }
        ]
      };
    }).finally(() => this.loading = false );
  }
}
