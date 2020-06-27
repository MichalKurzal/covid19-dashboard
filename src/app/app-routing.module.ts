import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {

    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'graphs1',
    loadChildren: () => import('./graphs1/graphs1.module').then( m => m.Graphs1PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
