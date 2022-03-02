import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { CountryDPageRoutingModule } from './country-d-routing.module'
import { CountryDPage } from './country-d.page'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CountryDPageRoutingModule,
    ],
    declarations: [CountryDPage],
})
export class CountryDPageModule {}
