import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { Routes, RouterModule } from '@angular/router'
import { TabsPage } from './tabs.page'


const routes: Routes = [
    {
        path: 'tabs-nav',
        component: TabsPage,
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('../dashboard/dashboard.module').then(
                        (m) => m.DashboardPageModule
                    ),
            },
            {
                path: 'countries',
                loadChildren: () =>
                    import('../countriesList/home.module').then(
                        (m) => m.CountriesListModule
                    ),
                pathMatch: 'full',
            },
            {
                path: 'graphs',
                loadChildren:() =>
                import('../chart1/graphs1.module').then(
                    (m)=>m.Graphs1PageModule
                )
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
                loadChildren: () =>
                    import('../about/about.module').then(
                        (m) => m.AboutPageModule
                    ),
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
