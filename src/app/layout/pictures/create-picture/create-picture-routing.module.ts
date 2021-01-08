import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePicturePage } from './create-picture.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePicturePage
  },
  {
    path: 'geoloc',
    loadChildren: () => import('./geoloc/geoloc.module').then( m => m.GeolocPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePicturePageRoutingModule {}
