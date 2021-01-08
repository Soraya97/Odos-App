import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PicturesPage } from './pictures.page';

const routes: Routes = [
  {
    path: '',
    component: PicturesPage
  },
  {
    path: 'create-picture',
    loadChildren: () => import('./create-picture/create-picture.module').then( m => m.CreatePicturePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PicturesPageRoutingModule {}
