import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { Graphs2Page } from '../chart2/graphs2.page'
import { Graphs1Page } from './graphs1.page'

const routes: Routes = [
    {
        path: '',
        component: Graphs1Page,
    },
    {
        path: '2',
        component: Graphs2Page,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Graphs1PageRoutingModule {}
