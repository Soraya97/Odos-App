import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePicturePageRoutingModule } from './create-picture-routing.module';

import { CreatePicturePage } from './create-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePicturePageRoutingModule
  ],
  declarations: [CreatePicturePage]
})
export class CreatePicturePageModule {}
