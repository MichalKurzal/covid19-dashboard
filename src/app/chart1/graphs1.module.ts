import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { Graphs1PageRoutingModule } from './graphs1-routing.module'
import { Graphs1Page } from './graphs1.page'
import { Graphs2Page } from '../chart2/graphs2.page'

@NgModule({
    imports: [ FormsModule, IonicModule, Graphs1PageRoutingModule],
    declarations: [Graphs1Page, Graphs2Page],
})
export class Graphs1PageModule {}
