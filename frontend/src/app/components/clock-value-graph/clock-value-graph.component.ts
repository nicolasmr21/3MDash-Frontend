import {Component, Input, OnInit} from '@angular/core';
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-clock-value-graph',
  templateUrl: './clock-value-graph.component.html',
  styleUrls: ['./clock-value-graph.component.scss']
})
export class ClockValueGraphComponent implements OnInit {

  @Input() measure: string;
  @Input() defaultPeriod: string;
  @Input() theme: string;
  @Input() value: number;
  @Input() data: string[][];
  filteredData: string[][];
  loading: boolean;
  options: any;

  constructor(
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.generateOptions(this.defaultPeriod || 'day');
  }

  generateOptions(period: string) {
    this.filteredData = this.filterService.filterDataByPeriod(period, this.data);
    this.options = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [{
        name: this.measure,
        type: 'gauge',
        detail: {
          formatter: '{value}'
        },
        data: [{
          value: this.filterService.getMaxValue(this.filteredData),
          name: 'SCORE'
        }]
      }]
    };
  }
}
