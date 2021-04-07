import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodSelectComponent } from "./period-select.component";
import { NbSelectModule } from "@nebular/theme";



@NgModule({
  declarations: [
    PeriodSelectComponent,
  ],
  exports: [
    PeriodSelectComponent
  ],
  imports: [
    CommonModule,
    NbSelectModule
  ]
})
export class PeriodSelectModule { }
