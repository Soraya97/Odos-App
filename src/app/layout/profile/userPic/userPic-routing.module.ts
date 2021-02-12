import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { userPicPage } from './userPic.page';

const routes: Routes = [
  {
    path: '',
    component: userPicPage
  },
  {
    path: 'add-pic-list/:id',
    loadChildren: () => import('../../add-pic-list/add-pic-list.module').then( m => m.AddPicListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class userPicPageRoutingModule {}
