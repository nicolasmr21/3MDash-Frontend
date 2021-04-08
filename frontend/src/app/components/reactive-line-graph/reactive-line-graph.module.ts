import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveLineGraphComponent } from './reactive-line-graph.component';
import {NbCardModule, NbSpinnerModule} from "@nebular/theme";
import {PeriodSelectModule} from "../period-select/period-select.module";
import {NgxEchartsModule} from "ngx-echarts";



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
    NgxEchartsModule
  ]
})
export class ReactiveLineGraphModule { }
