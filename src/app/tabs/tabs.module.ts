import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { Routes, RouterModule } from '@angular/router'
import { TabsPage } from './tabs.page'
import { Graphs1Page } from '../chart1/graphs1.page'
import { Graphs2Page } from '../chart2/graphs2.page'
import { DashboardPage } from '../dashboard/dashboard.page'
import { CountriesListPage } from '../countriesList/home.page'
import { CountryDPage } from '../countryDetail/country-d.page'
import { AboutPage } from '../about/about.page'

const routes: Routes = [
    {
        path: 'tabs-nav',
        component: TabsPage,
        children: [
            {
                path: 'dashboard',
                component: DashboardPage,
            },
            {
                path: 'countries',
                component: CountriesListPage,
                pathMatch: 'full',
            },
            {
                path: 'graphs1',
                component: Graphs1Page,
            },
            {
                path: 'graphs2',
                component: Graphs2Page,
            },
            {
                path: 'countryD',
                loadChildren: () =>
                    import('../countryDetail/country-d.module').then(
                        (m) => m.CountryDPageModule
                    ),
                pathMatch: 'full',
            },
            {
                path: 'about',
                component: AboutPage,
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs-nav/dashboard',
    },
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [TabsPage],
})
export class TabsPageModule {}
