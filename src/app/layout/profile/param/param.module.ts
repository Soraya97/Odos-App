import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParamPageRoutingModule } from './param-routing.module';

import { ParamPage } from './param.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParamPageRoutingModule
  ],
  declarations: [ParamPage]
})
export class ParamPageModule {}
