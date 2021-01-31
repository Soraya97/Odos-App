import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { userPicPage } from './userPic.page';

const routes: Routes = [
  {
    path: '',
    component: userPicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class userPicPageRoutingModule {}
