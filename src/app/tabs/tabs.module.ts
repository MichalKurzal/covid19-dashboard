import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs-nav',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'graphs1',
        loadChildren: '../graphs1/graphs1.module#Graphs1PageModule'
      },
      {
        path: 'graphs2',
        loadChildren: '../graphs2/graphs2.module#Graphs2PageModule'
      },
      {
        path: 'countryD',
        loadChildren: '../country-d/country-d.module#CountryDPageModule'
      },
      {
        path: 'about',
        loadChildren: '../about/about.module#AboutPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs-nav/dashboard'
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
