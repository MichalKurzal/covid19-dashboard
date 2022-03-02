import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { DashboardPageRoutingModule } from './dashboard-routing.module'
import { DashboardPage } from './dashboard.page'
import { DetailDashComponent } from '../detail-dash/detail-dash.component'
import { CommonModule } from '@angular/common'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPageRoutingModule,
    ],
    declarations: [DashboardPage, DetailDashComponent],
})
export class DashboardPageModule {}
