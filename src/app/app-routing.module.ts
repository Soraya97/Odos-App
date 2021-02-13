import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./auth/auth.guard";
import { Page404Page } from './layout/errors/page404/page404.page';
import {RegisterComponent} from './layout/register/register.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import("./layout/layout.module").then((m) => m.LayoutPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./layout/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '**', component: Page404Page }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
