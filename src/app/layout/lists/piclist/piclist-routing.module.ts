import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PiclistPage } from './piclist.page';

const routes: Routes = [
  {
    path: '',
    component: PiclistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiclistPageRoutingModule {}
