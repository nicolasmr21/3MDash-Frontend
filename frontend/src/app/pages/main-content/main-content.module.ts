import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentRoutingModule } from './main-content.routing.module';
import { MainContentComponent } from './main-content.component';

@NgModule({
  declarations: [MainContentComponent],
  imports: [
    CommonModule,
    MainContentRoutingModule,
  ],
})

export class MainContentModule {
}
