import {Component, Input, OnInit} from '@angular/core';
import {CsvService} from "../../services/csv.service";
import {combineLatest, of} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-active-reactive-line-graph',
  templateUrl: './active-reactive-line-graph.component.html',
  styleUrls: ['./active-reactive-line-graph.component.scss']
})
export class ActiveReactiveLineGraphComponent implements OnInit {

  @Input() theme: string;
  @Input() defaultPeriod: string;
  options: any;
  loading: boolean;
  activeData: string[][];
  reactiveData: string[][];
  activeFilteredData: string[][];
  reactiveFilteredData: string[][];

  constructor(
    private csvService: CsvService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    combineLatest([
      fromPromise(this.csvService.getActiveData()),
      fromPromise(this.csvService.getReactiveData())
    ])
      .pipe(
        tap(([a, b]) => {
          this.activeData = a;
          this.reactiveData = b;
        }),
        tap(() => this.generateOptions(this.defaultPeriod || 'day')),
        tap(() => this.loading = false),
      )
      .subscribe()
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
          data: this.reactiveFilteredData.map((item) => item[1])
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
          data: this.activeFilteredData.map((item) => item[1])
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
          data: this.reactiveFilteredData.map((value) => parseFloat(value[2]))
        },
        {
          name: 'Energía Activa',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          emphasis: {
            focus: 'series'
          },
          data: this.activeFilteredData.map((value) => parseFloat(value[2]))
        }
      ]
    };
  }

  private filterData(period: string, data: string[][]) {
    switch (period) {
      case 'day':
        return data.slice(data.length - 24);
      case 'week':
        return data.slice(data.length - 168);
      case 'month':
        return data.slice(data.length - 5000);
      default:
        return data;
    }
  }
}
