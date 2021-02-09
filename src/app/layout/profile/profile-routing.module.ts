import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'param',
    loadChildren: () => import('./param/param.module').then(m => m.ParamPageModule),
  },
  {
    path: 'userPic/:id',
    loadChildren: () => import('./userPic/userPic.module').then(m => m.userPicPageModule)
  },
  {
    path: 'add-pic-list',
    loadChildren: () => import('./userPic/add-pic-list/add-pic-list.module').then( m => m.AddPicListPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule { }
