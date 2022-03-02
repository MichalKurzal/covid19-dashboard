import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CountriesListPage } from './home.page'

const routes: Routes = [
    {
        path: '',
        component: CountriesListPage,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomePageRoutingModule {}
