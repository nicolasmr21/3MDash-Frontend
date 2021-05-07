import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerFactorRoutingModule } from './power-factor-routing.module';
import { PowerFactorComponent } from './power-factor.component';
import {NbAccordionModule, NbSpinnerModule} from "@nebular/theme";
import {MeasureMatrixModule} from "../../components/measure-matrix/measure-matrix.module";
import {MeasureLineGraphModule} from "../../components/measure-line-graph/measure-line-graph.module";


@NgModule({
  declarations: [PowerFactorComponent],
  imports: [
    CommonModule,
    PowerFactorRoutingModule,
    NbAccordionModule,
    NbSpinnerModule,
    MeasureMatrixModule,
    MeasureLineGraphModule
  ]
})
export class PowerFactorModule { }
