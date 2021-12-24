import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { Graphs1Page } from './graphs1.page'

const routes: Routes = [
    {
        path: '',
        component: Graphs1Page,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Graphs1PageRoutingModule {}
