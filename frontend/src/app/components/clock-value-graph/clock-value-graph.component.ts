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
  @Input() units: number;
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
    console.log(this.filteredData, this.filterService.getMaxValue(this.filteredData))
    this.options = {
      background: 'transparent',
      tooltip: {
        formatter: '{a} {b} : {c} ' +this.units
      },
      series: [{
        min: 0,
        max: 2000,
        name: this.measure,
        type: 'gauge',
        detail: {
          formatter: '{value} ' +this.units
        },
        data: [{
          value: this.filterService.getMaxValue(this.filteredData),
        }]
      }]
    };
    this.loading = false;
  }
}
