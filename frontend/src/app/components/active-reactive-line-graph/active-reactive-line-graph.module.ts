import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveReactiveLineGraphComponent } from './active-reactive-line-graph.component';
import {NbCardModule, NbSpinnerModule} from "@nebular/theme";
import {NgxEchartsModule} from "ngx-echarts";
import {PeriodSelectModule} from "../period-select/period-select.module";
import {DateRangeSelectorModule} from "../date-range-selector/date-range-selector.module";



@NgModule({
  declarations: [ActiveReactiveLineGraphComponent],
  exports: [
    ActiveReactiveLineGraphComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NgxEchartsModule,
    PeriodSelectModule,
    NbSpinnerModule,
    DateRangeSelectorModule
  ]
})
export class ActiveReactiveLineGraphModule { }
