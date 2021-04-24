import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSelectorComponent } from './data-selector.component';
import {NbSelectModule} from "@nebular/theme";



@NgModule({
  declarations: [DataSelectorComponent],
  exports: [
    DataSelectorComponent
  ],
  imports: [
    CommonModule,
    NbSelectModule
  ]
})
export class DataSelectorModule { }
