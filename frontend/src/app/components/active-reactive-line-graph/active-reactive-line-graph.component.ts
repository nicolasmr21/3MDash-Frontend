import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConsumptionUnitDto} from "../../models/consumption-unit-dto";
import {Observable} from "rxjs";
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

  @Output() dateEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  options: any;
  loading: boolean;
  activeData: ConsumptionUnitDto[];
  reactiveData: ConsumptionUnitDto[];

  constructor(
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
        tap(() => this.generateOptions())
      )
      .subscribe();
  }

  generateOptions() {
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
          data: this.reactiveData.map((item) => item.dateConsumption
          )
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
          data: this.activeData.map((item) => item.dateConsumption)
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
          data: this.reactiveData.map((value) => value.consumptionUnits)
        },
        {
          name: 'Energía Activa',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          emphasis: {
            focus: 'series'
          },
          data: this.activeData.map((value) => value.consumptionUnits)
        }
      ]
    };
    this.loading = false;
  }

  onDateChange(dates: Date[]): void {
    this.dateEmitter.emit(dates);
  }
}
