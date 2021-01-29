import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapPage } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LeafletModule],
  exports: [RouterModule],
})
export class MapPageRoutingModule {}
