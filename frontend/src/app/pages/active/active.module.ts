import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveRoutingModule } from './active-routing.module';
import { ActiveComponent } from './active.component';
import {NbAccordionModule, NbCardModule, NbSpinnerModule, NbTabsetModule} from "@nebular/theme";
import {MeasureMatrixModule} from "../../components/measure-matrix/measure-matrix.module";
import {MeasureLineGraphModule} from "../../components/measure-line-graph/measure-line-graph.module";


@NgModule({
  declarations: [ActiveComponent],
  imports: [
    CommonModule,
    ActiveRoutingModule,
    NbTabsetModule,
    NbCardModule,
    MeasureMatrixModule,
    NbSpinnerModule,
    MeasureLineGraphModule,
    NbAccordionModule
  ]
})
export class ActiveModule { }
