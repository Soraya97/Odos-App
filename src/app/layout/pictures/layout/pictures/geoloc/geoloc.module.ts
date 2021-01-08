import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocPageRoutingModule } from './geoloc-routing.module';

import { GeolocPage } from './geoloc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocPageRoutingModule
  ],
  declarations: [GeolocPage]
})
export class GeolocPageModule {}
