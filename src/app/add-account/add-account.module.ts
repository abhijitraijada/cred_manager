import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAccountPageRoutingModule } from './add-account-routing.module';

import { AddAccountPage } from './add-account.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddAccountPageRoutingModule
  ],
  declarations: [AddAccountPage]
})
export class AddAccountPageModule {}
