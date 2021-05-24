import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateClientRoutingModule } from './create-client-routing.module';
import { CreateClientComponent } from './create-client.component';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTooltipModule
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [CreateClientComponent],
  imports: [
    CommonModule,
    CreateClientRoutingModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTooltipModule
  ]
})
export class CreateClientModule { }
