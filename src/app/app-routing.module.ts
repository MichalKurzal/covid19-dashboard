import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { Graphs1Page } from './chart1/graphs1.page'
import { Graphs2Page } from './chart2/graphs2.page'

const routes: Routes = [
    {
        path: '',
        loadChildren: './tabs/tabs.module#TabsPageModule',
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
        path: 'country-d',
        loadChildren: () =>
            import('./countryDetail/country-d.module').then(
                (m) => m.CountryDPageModule
            ),
    },
    {
        path: 'about',
        loadChildren: () =>
            import('./about/about.module').then((m) => m.AboutPageModule),
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
