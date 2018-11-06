import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GpxhistoryPage } from './gpxhistory.page';

const routes: Routes = [
  {
    path: '',
    component: GpxhistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GpxhistoryPage]
})
export class GpxhistoryPageModule {}
