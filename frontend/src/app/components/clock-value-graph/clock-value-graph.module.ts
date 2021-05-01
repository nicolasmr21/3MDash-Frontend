import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockValueGraphComponent } from './clock-value-graph.component';
import {NbCardModule, NbSpinnerModule} from "@nebular/theme";
import {PeriodSelectModule} from "../period-select/period-select.module";
import {NgxEchartsModule} from "ngx-echarts";
import {DateRangeSelectorModule} from "../date-range-selector/date-range-selector.module";



@NgModule({
  declarations: [ClockValueGraphComponent],
  exports: [
    ClockValueGraphComponent
  ],
  imports: [
    CommonModule,
    NbSpinnerModule,
    NbCardModule,
    PeriodSelectModule,
    NgxEchartsModule,
    DateRangeSelectorModule
  ]
})
export class ClockValueGraphModule { }
