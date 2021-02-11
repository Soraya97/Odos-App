import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPicListPageRoutingModule } from './add-pic-list-routing.module';

import { AddPicListPage } from './add-pic-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPicListPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPicListPage]
})
export class AddPicListPageModule {}
