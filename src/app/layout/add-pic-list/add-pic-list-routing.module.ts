import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPicListPage } from './add-pic-list.page';

const routes: Routes = [
  {
    path: '',
    component: AddPicListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPicListPageRoutingModule {}
