import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-detail-dash',
    templateUrl: './detail-dash.component.html',
    styleUrls: ['./detail-dash.component.scss'],
})
export class DetailDashComponent {
    @Input() totalCases
    @Input() totalDeaths
    @Input() totalRecovered
    @Input() newCases
    @Input() newDeaths
    @Input() newRecovered

    constructor(public router: Router) {}

    goforward = () => this.router.navigateByUrl('tabs-nav/graphs')
    goforward2 = () => this.router.navigateByUrl('tabs-nav/graphs/2')
}
