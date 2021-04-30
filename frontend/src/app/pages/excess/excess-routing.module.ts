import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcessComponent } from "./excess.component";

const routes: Routes = [
  {
    path: '',
    component: ExcessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcessRoutingModule { }
