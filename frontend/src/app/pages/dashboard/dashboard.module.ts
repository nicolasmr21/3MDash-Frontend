import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {NgxEchartsModule} from "ngx-echarts";
import {ActiveLineGraphModule} from "../../components/active-line-graph/active-line-graph.module";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule,
    ActiveLineGraphModule
  ]
})
export class DashboardModule { }
