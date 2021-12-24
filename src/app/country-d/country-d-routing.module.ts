import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CountryDPage } from './country-d.page'

const routes: Routes = [
    {
        path: '',
        component: CountryDPage,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CountryDPageRoutingModule {}
