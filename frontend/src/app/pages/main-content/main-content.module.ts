import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentRoutingModule } from './main-content.routing.module';
import { MainContentComponent } from './main-content.component';
import {
  NbButtonModule,
  NbCardModule, NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule, NbUserModule
} from "@nebular/theme";

@NgModule({
  declarations: [MainContentComponent],
  imports: [
    CommonModule,
    MainContentRoutingModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbIconModule,
    NbButtonModule,
    NbUserModule,
    NbContextMenuModule,
  ],
})

export class MainContentModule {
}
