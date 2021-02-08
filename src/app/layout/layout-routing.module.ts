import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        // Route that loads the Feed module
        path: 'feed',
        loadChildren: () =>
          import('./feed/feed.module').then(
            m => m.FeedPageModule
          ),
      },
      {
        path: 'lists',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./lists/lists.module').then(
            m => m.ListsPageModule
          ),
      },
      {
        path: 'pictures',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pictures/pictures.module').then(
            m => m.PicturesPageModule
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./profile/profile.module').then(
            m => m.ProfilePageModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then(
            m => m.LoginPageModule
          ),
      },
      {
        path: '**',
        loadChildren: () =>
          import('./errors/page404/page404.module').then(
            m => m.Page404PageModule
          ),
      },
      {
        path: "",
        redirectTo: "feed",
        pathMatch: "full",
      },
    ],
  },
  {
    path: 'page404',
    loadChildren: () => import('./errors/page404/page404.module').then( m => m.Page404PageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule { }
