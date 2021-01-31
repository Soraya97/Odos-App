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
    loadChildren: () => import('./param/param.module').then( m => m.ParamPageModule),
  },
  {    path: 'userPic',
  loadChildren: () => import('./userPic/userPic.module').then( m => m.userPicPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
