import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCardPageRoutingModule } from './add-card-routing.module';

import { AddCardPage } from './add-card.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddCardPageRoutingModule
  ],
  declarations: [AddCardPage]
})
export class AddCardPageModule {}
