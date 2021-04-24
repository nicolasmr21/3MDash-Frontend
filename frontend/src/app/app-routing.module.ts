import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as authGuard } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'main',
    canActivate: [authGuard],
    data: {
      expectedRol: ['superadmin', 'client-admin', 'contract-admin']
    },
    loadChildren: () => import('./pages/main-content/main-content.module').then(m => m.MainContentModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
