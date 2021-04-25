import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from "../../services/filter.service";

@Component({
  selector: 'app-active-line-graph',
  templateUrl: './active-line-graph.component.html',
  styleUrls: ['./active-line-graph.component.scss']
})
export class ActiveLineGraphComponent implements OnInit {

  @Input() theme: string;
  @Input() defaultPeriod: string;
  @Input() data: string[][];
  options: any;
  loading: boolean;
  filteredData: string[][];

  constructor(
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.generateOptions(this.defaultPeriod || 'day');
  }

  generateOptions(period: string) {
    this.filteredData = this.filterData(period);
    this.options = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        formatter: 'Fecha: {b}  <br/> Consumo {c}kWh',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        show: true,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          formatter: '',
        },
        boundaryGap: true,
        data: this.filteredData.map(value => value[1])
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}kWh'
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
          data: this.filteredData.map(value => parseFloat(value[2])),
          lineStyle: {
            color: 'rgb(5, 216, 145)',
            width: 2,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowBlur: 10,
            shadowOffsetY: 8
          },
        }
      ]
    };
    this.loading = false;
  }

  private filterData(period: string) {
    return this.filterService.filterDataByPeriod(period, this.data);
  }
}
