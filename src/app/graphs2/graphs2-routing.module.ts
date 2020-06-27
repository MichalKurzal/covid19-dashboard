import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Graphs2Page } from './graphs2.page';

const routes: Routes = [
  {
    path: '',
    component: Graphs2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Graphs2PageRoutingModule {}
