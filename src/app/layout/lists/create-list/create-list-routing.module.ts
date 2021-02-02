import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateListPage } from './create-list.page';

const routes: Routes = [
  {
    path: '',
    component: CreateListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateListPageRoutingModule {}
