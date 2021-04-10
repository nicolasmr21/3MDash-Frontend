import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {NgxEchartsModule} from "ngx-echarts";
import {ActiveLineGraphModule} from "../../components/active-line-graph/active-line-graph.module";
import {NbLayoutModule, NbSpinnerModule} from "@nebular/theme";
import {ReactiveLineGraphModule} from "../../components/reactive-line-graph/reactive-line-graph.module";
import {ActiveReactiveLineGraphModule} from "../../components/active-reactive-line-graph/active-reactive-line-graph.module";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule,
    ActiveLineGraphModule,
    NbLayoutModule,
    ReactiveLineGraphModule,
    NbSpinnerModule,
    ActiveReactiveLineGraphModule
  ]
})
export class DashboardModule { }
