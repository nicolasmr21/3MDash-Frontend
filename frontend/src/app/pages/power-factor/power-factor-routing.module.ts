import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PowerFactorComponent } from "./power-factor.component";

const routes: Routes = [
  {
    path: '',
    component: PowerFactorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PowerFactorRoutingModule { }
