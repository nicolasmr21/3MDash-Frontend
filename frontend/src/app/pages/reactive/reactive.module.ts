import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveRoutingModule } from './reactive-routing.module';
import { ReactiveComponent } from './reactive.component';
import {NbAccordionModule, NbSpinnerModule} from "@nebular/theme";
import {MeasureMatrixModule} from "../../components/measure-matrix/measure-matrix.module";
import {ReactiveLineGraphModule} from "../../components/reactive-line-graph/reactive-line-graph.module";


@NgModule({
  declarations: [ReactiveComponent],
  imports: [
    CommonModule,
    ReactiveRoutingModule,
    NbAccordionModule,
    MeasureMatrixModule,
    ReactiveLineGraphModule,
    NbSpinnerModule
  ]
})
export class ReactiveModule { }
