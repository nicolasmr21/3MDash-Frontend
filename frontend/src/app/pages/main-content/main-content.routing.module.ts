import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'active',
        loadChildren: () => import('../active/active.module').then(m => m.ActiveModule)
      },
      {
        path: 'reactive',
        loadChildren: () => import('../reactive/reactive.module').then(m => m.ReactiveModule)
      },
      {
        path: 'power-factor',
        loadChildren: () => import('../power-factor/power-factor.module').then(m => m.PowerFactorModule)
      },
      {
        path: 'excess',
        loadChildren: () => import('../excess/excess.module').then(m => m.ExcessModule)
      },
      {
        path: 'prices',
        loadChildren: () => import('../prices/prices.module').then(m => m.PricesModule)
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MainContentRoutingModule {
}
