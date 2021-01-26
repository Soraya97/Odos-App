import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParamPage } from './param.page';

const routes: Routes = [
  {
    path: '',
    component: ParamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamPageRoutingModule {}
