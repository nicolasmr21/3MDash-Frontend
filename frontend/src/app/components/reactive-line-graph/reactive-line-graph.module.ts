import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveLineGraphComponent } from './reactive-line-graph.component';
import {NbCardModule, NbSpinnerModule} from "@nebular/theme";
import {PeriodSelectModule} from "../period-select/period-select.module";
import {NgxEchartsModule} from "ngx-echarts";
import {DateRangeSelectorModule} from "../date-range-selector/date-range-selector.module";



@NgModule({
  declarations: [ReactiveLineGraphComponent],
  exports: [
    ReactiveLineGraphComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbSpinnerModule,
    PeriodSelectModule,
    NgxEchartsModule,
    DateRangeSelectorModule
  ]
})
export class ReactiveLineGraphModule { }
