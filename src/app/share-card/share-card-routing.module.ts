import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareCardPage } from './share-card.page';

const routes: Routes = [
  {
    path: '',
    component: ShareCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareCardPageRoutingModule {}
