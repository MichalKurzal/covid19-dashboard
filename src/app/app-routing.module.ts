import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        loadChildren: './tabs/tabs.module#TabsPageModule',
    },
    {
        path: 'graphs1',
        loadChildren: () =>
            import('./graphs1/graphs1.module').then((m) => m.Graphs1PageModule),
    },
    {
        path: 'graphs2',
        loadChildren: () =>
            import('./graphs2/graphs2.module').then((m) => m.Graphs2PageModule),
    },
    {
        path: 'country-d',
        loadChildren: () =>
            import('./country-d/country-d.module').then(
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
