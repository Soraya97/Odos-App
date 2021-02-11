import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsPage } from './lists.page';

const routes: Routes = [
  {
    path: '',
    component: ListsPage
  },
  {
    path: 'create-list',
    loadChildren: () => import('./create-list/create-list.module').then( m => m.CreateListPageModule)
  },
  {
    path: 'piclist/:id',
    loadChildren: () => import('./piclist/piclist.module').then( m => m.PiclistPageModule)
  },
  {
    path: 'modify-list/:id',
    loadChildren: () => import('./modify-list/modify-list.module').then( m => m.ModifyListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsPageRoutingModule {}
