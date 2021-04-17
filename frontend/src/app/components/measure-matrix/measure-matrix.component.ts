import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-measure-matrix',
  templateUrl: './measure-matrix.component.html',
  styleUrls: ['./measure-matrix.component.scss']
})
export class MeasureMatrixComponent implements OnInit {

  @Input() measure: string;
  @Input() defaultPeriod: string;
  @Input() theme: string;
  @Input() units: number;
  @Input() data: string[][];
  filteredData: string[][];
  loading: boolean;
  options: any;

  constructor() { }

  ngOnInit(): void {
  }

}
