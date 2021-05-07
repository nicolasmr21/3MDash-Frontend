import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcessRoutingModule } from './excess-routing.module';
import { ExcessComponent } from './excess.component';
import {NbAccordionModule, NbSpinnerModule} from "@nebular/theme";
import {MeasureMatrixModule} from "../../components/measure-matrix/measure-matrix.module";
import {MeasureLineGraphModule} from "../../components/measure-line-graph/measure-line-graph.module";


@NgModule({
  declarations: [ExcessComponent],
  imports: [
    CommonModule,
    ExcessRoutingModule,
    NbAccordionModule,
    MeasureMatrixModule,
    NbSpinnerModule,
    MeasureLineGraphModule
  ]
})
export class ExcessModule { }
