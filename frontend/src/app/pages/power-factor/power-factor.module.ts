import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerFactorRoutingModule } from './power-factor-routing.module';
import { PowerFactorComponent } from './power-factor.component';


@NgModule({
  declarations: [PowerFactorComponent],
  imports: [
    CommonModule,
    PowerFactorRoutingModule
  ]
})
export class PowerFactorModule { }
