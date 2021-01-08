import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeolocPage } from './geoloc.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeolocPageRoutingModule {}
