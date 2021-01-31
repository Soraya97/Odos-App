import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { userPicPageRoutingModule } from './userPic-routing.module';

import { userPicPage } from './userPic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    userPicPageRoutingModule
  ],
  declarations: [userPicPage]
})
export class userPicPageModule {}
