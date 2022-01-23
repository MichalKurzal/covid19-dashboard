import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { Graphs2PageRoutingModule } from './graphs2-routing.module'

import { Graphs2Page } from './graphs2.page'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, Graphs2PageRoutingModule],
    declarations: [Graphs2Page],
})
export class Graphs2PageModule {}
