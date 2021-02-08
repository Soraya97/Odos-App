import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiclistPageRoutingModule } from './piclist-routing.module';

import { PiclistPage } from './piclist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiclistPageRoutingModule
  ],
  declarations: [PiclistPage]
})
export class PiclistPageModule {}
