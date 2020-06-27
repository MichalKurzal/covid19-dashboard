import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Graphs1PageRoutingModule } from './graphs1-routing.module';

import { Graphs1Page } from './graphs1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Graphs1PageRoutingModule
  ],
  declarations: [Graphs1Page]
})
export class Graphs1PageModule {}
