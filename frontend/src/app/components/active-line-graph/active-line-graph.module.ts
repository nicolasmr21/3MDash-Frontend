import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveLineGraphComponent } from "./active-line-graph.component";
import {NgxEchartsModule} from "ngx-echarts";
import {NbCardModule, NbSelectModule, NbSpinnerModule} from "@nebular/theme";
import {PeriodSelectModule} from "../period-select/period-select.module";

@NgModule({
  declarations: [ActiveLineGraphComponent],
  exports: [
    ActiveLineGraphComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NbCardModule,
    NbSpinnerModule,
    NbSelectModule,
    PeriodSelectModule
  ]
})
export class ActiveLineGraphModule { }
