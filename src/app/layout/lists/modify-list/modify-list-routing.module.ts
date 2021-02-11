import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyListPage } from './modify-list.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyListPageRoutingModule {}
