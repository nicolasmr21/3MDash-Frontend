import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from "../../services/filter.service";
import {ConsumptionUnitDto} from "../../models/consumption-unit-dto";
import {combineLatest, Observable} from "rxjs";
import {filter, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-active-reactive-line-graph',
  templateUrl: './active-reactive-line-graph.component.html',
  styleUrls: ['./active-reactive-line-graph.component.scss']
})
export class ActiveReactiveLineGraphComponent implements OnInit {

  @Input() theme: string;
  @Input() defaultPeriod: string;
  @Input() activeData$: Observable<ConsumptionUnitDto[]>;
  @Input() reactiveData$: Observable<ConsumptionUnitDto[]>;
  @Input() activeData: ConsumptionUnitDto[];
  @Input() reactiveData: ConsumptionUnitDto[];
  options: any;
  loading: boolean;
  activeFilteredData: ConsumptionUnitDto[];
  reactiveFilteredData: ConsumptionUnitDto[];

  constructor(
    private filterService: FilterService,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.activeData$
      .pipe(
        filter((data) => !!data),
        tap((data) => this.activeData = data),
        switchMap(() => this.reactiveData$),
        filter((data) => !!data),
        tap((data) => this.reactiveData = data),
        tap(() => this.generateOptions(this.defaultPeriod || 'day'))
      )
      .subscribe();
  }

  generateOptions(period: string) {
    this.activeFilteredData = this.filterData(period, this.activeData);
    this.reactiveFilteredData = this.filterData(period, this.reactiveData);
    this.options = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data:['Energía Activa', 'Energía Reactiva']
      },
      grid: {
        top: 70,
        bottom: 50
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            formatter: '',
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: 'rgba(52, 103, 255, 1)',
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return 'Fecha: ' + params.value
                  + (params.seriesData.length ? ' Consumo: ' + params.seriesData[0].data + 'kVArh' : '');
              }
            }
          },
          data: this.reactiveFilteredData.map((item) => item.dateConsumption)
        },
        {
          type: 'category',
          axisLabel: {
            formatter: '',
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: 'rgb(5, 216, 145)',
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return 'Fecha: ' + params.value
                  + (params.seriesData.length ? ' Consumo: ' + params.seriesData[0].data + 'kWh' : '');
              }
            }
          },
          data: this.activeFilteredData.map((item) => item.dateConsumption)
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Energía Reactiva',
          type: 'line',
          smooth: true,
          emphasis: {
            focus: 'series'
          },
          data: this.reactiveFilteredData.map((value) => value.consumptionUnits)
        },
        {
          name: 'Energía Activa',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          emphasis: {
            focus: 'series'
          },
          data: this.activeFilteredData.map((value) => value.consumptionUnits)
        }
      ]
    };
    this.loading = false;
  }

  private filterData(period: string, data: ConsumptionUnitDto[]) {
    return this.filterService.filterDataByPeriod(period, data);
  }
}
