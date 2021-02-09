import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPicListPageRoutingModule } from './add-pic-list-routing.module';

import { AddPicListPage } from './add-pic-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPicListPageRoutingModule
  ],
  declarations: [AddPicListPage]
})
export class AddPicListPageModule {}
