import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveRoutingModule } from './reactive-routing.module';
import { ReactiveComponent } from './reactive.component';
import { NbAccordionModule, NbSpinnerModule } from "@nebular/theme";
import { MeasureMatrixModule } from "../../components/measure-matrix/measure-matrix.module";
import {MeasureLineGraphModule} from "../../components/measure-line-graph/measure-line-graph.module";


@NgModule({
  declarations: [ReactiveComponent],
  imports: [
    CommonModule,
    ReactiveRoutingModule,
    NbAccordionModule,
    MeasureMatrixModule,
    NbSpinnerModule,
    MeasureLineGraphModule
  ]
})
export class ReactiveModule { }
