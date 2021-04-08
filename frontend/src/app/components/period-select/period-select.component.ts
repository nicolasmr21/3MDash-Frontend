import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-period-select',
  templateUrl: './period-select.component.html',
  styleUrls: ['./period-select.component.scss']
})
export class PeriodSelectComponent implements OnInit {

  @Input() defaultPeriod: string;
  @Output() selectedEmitter: EventEmitter<string> = new EventEmitter<string>();

  selectedItem: string;

  constructor() { }

  ngOnInit(): void {
    this.selectedItem = this.defaultPeriod || 'day';
  }

  onSelectedChange(selected: string) {
    this.selectedEmitter.emit(selected);
  }
}
