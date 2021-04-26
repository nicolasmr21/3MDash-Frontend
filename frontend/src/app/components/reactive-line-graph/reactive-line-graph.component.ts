import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from "../../services/filter.service";
import {ConsumptionUnitDto} from "../../models/consumption-unit-dto";

@Component({
  selector: 'app-reactive-line-graph',
  templateUrl: './reactive-line-graph.component.html',
  styleUrls: ['./reactive-line-graph.component.scss']
})
export class ReactiveLineGraphComponent implements OnInit {

  @Input() theme: string;
  @Input() defaultPeriod: string;
  @Input() data: ConsumptionUnitDto[];
  options: any;
  loading: boolean;
  filteredData: ConsumptionUnitDto[];

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
        formatter: 'Fecha: {b}  <br/> Consumo {c}kVArh',
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
        data: this.filteredData.map(value => value.dateConsumption)
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}kVArh'
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
          data: this.filteredData.map(value => value.consumptionUnits),
          lineStyle: {
            color: 'rgba(52, 103, 255, 1)',
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
