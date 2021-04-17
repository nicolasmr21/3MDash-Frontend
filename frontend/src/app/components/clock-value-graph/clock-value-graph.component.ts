import {Component, Input, OnInit} from '@angular/core';

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
  loading: boolean;
  options: any;

  constructor() { }

  ngOnInit(): void {
    this.loading = true;

  }

  generateOptions($event: string) {

  }
}
