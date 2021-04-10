import {Component, Input, OnInit} from '@angular/core';
import {CsvService} from "../../services/csv.service";

@Component({
  selector: 'app-reactive-line-graph',
  templateUrl: './reactive-line-graph.component.html',
  styleUrls: ['./reactive-line-graph.component.scss']
})
export class ReactiveLineGraphComponent implements OnInit {

  @Input() theme: string;
  @Input() defaultPeriod: string;
  options: any;
  loading: boolean;
  data: string[][];
  filteredData: string[][];

  constructor(
    private csvService: CsvService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.csvService.getReactiveData()
      .then((data) => this.data = data)
      .then(() => this.generateOptions(this.defaultPeriod || 'day'))
      .finally(() => this.loading = false );
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
        data: this.filteredData.map(value => value[1])
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
          data: this.filteredData.map(value => parseFloat(value[2])),
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
  }

  private filterData(period: string) {
    switch (period) {
      case 'day':
        return  this.data.slice(this.data.length-24);
      case 'week':
        return this.data.slice(this.data.length-168);
      case 'month':
        return this.data.slice(this.data.length-5000);
      default:
        return this.data;
    }
  }
}
