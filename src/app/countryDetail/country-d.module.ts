import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { CountryDPageRoutingModule } from './country-d-routing.module'
import { CountryDPage } from './country-d.page';
import { CountryDetailChartsComponent } from './country-detail-charts/country-detail-charts.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CountryDPageRoutingModule,
    ],
    declarations: [CountryDPage, CountryDetailChartsComponent],
})
export class CountryDPageModule {}
