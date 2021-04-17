import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeSelectorComponent } from './date-range-selector.component';
import {NbDatepickerModule, NbInputModule} from "@nebular/theme";



@NgModule({
  declarations: [DateRangeSelectorComponent],
  exports: [
    DateRangeSelectorComponent
  ],
  imports: [
    CommonModule,
    NbDatepickerModule,
    NbInputModule
  ]
})
export class DateRangeSelectorModule { }
