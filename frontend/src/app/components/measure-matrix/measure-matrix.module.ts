import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasureMatrixComponent } from './measure-matrix.component';
import {NbCardModule, NbLayoutModule, NbSpinnerModule} from "@nebular/theme";
import {DateRangeSelectorModule} from "../date-range-selector/date-range-selector.module";



@NgModule({
  declarations: [MeasureMatrixComponent],
  exports: [
    MeasureMatrixComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbSpinnerModule,
    DateRangeSelectorModule,
    NbLayoutModule
  ]
})
export class MeasureMatrixModule { }
