import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcessRoutingModule } from './excess-routing.module';
import { ExcessComponent } from './excess.component';


@NgModule({
  declarations: [ExcessComponent],
  imports: [
    CommonModule,
    ExcessRoutingModule
  ]
})
export class ExcessModule { }
