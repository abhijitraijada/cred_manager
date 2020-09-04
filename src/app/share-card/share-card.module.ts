import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareCardPageRoutingModule } from './share-card-routing.module';

import { ShareCardPage } from './share-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareCardPageRoutingModule
  ],
  declarations: [ShareCardPage]
})
export class ShareCardPageModule {}
