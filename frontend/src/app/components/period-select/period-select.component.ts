import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-period-select',
  templateUrl: './period-select.component.html',
  styleUrls: ['./period-select.component.scss']
})
export class PeriodSelectComponent implements OnInit {

  selectedItem: string;
  @Output() selectedEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.selectedItem = 'day';
  }

  onSelectedChange(selected: string) {
    this.selectedEmitter.emit(selected);
  }
}
