import { NgModule } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { CountriesList } from './home.page'
import { HomePageRoutingModule } from './home-routing.module'
import { CommonModule } from '@angular/common'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
    declarations: [CountriesList],
})
export class CountriesListModule {}
