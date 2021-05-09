import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricesRoutingModule } from './prices-routing.module';
import { PricesComponent } from './prices.component';
import {NbAccordionModule, NbSpinnerModule} from "@nebular/theme";
import {MeasureLineGraphModule} from "../../components/measure-line-graph/measure-line-graph.module";
import {MeasureMatrixModule} from "../../components/measure-matrix/measure-matrix.module";
import {PricesLineGraphModule} from "../../components/prices-line-graph/prices-line-graph.module";


@NgModule({
  declarations: [PricesComponent],
  imports: [
    CommonModule,
    PricesRoutingModule,
    NbAccordionModule,
    MeasureLineGraphModule,
    MeasureMatrixModule,
    NbSpinnerModule,
    PricesLineGraphModule
  ]
})
export class PricesModule { }
