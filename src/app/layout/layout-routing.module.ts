import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

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
        loadChildren: () =>
          import('./lists/lists.module').then(
            m => m.ListsPageModule
          ),
      },
      {
        path: 'pictures',
        loadChildren: () =>
          import('./pictures/pictures.module').then(
            m => m.PicturesPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(
            m => m.ProfilePageModule
          ),
      },
      {
       path: "",
       redirectTo: "feed",
       pathMatch: "full",
     },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule { }
