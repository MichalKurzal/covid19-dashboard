import { Component, OnInit } from '@angular/core'
import { Storage } from '@ionic/storage-angular'
import { Router } from '@angular/router'
import { Platform } from '@ionic/angular'
import { ChartService } from '../services/chart.service'

@Component({
    selector: 'app-graphs1',
    templateUrl: './graphs1.page.html',
    styleUrls: ['./graphs1.page.scss'],
})
export class Graphs1Page implements OnInit {
    constructor(
        private storage: Storage,
        public chartService: ChartService,
        public router: Router,
        public platform: Platform
    ) {}

    async ngOnInit() {
        await this.storage.create()
        if (this.platform.is('cordova')) {
            this.getdata()
        }
    }

    async getdata() {
        const res = await this.storage.get('DataCountries')
        const data = []
        for (const d of res) {
            if (d.cases > 5000000) {
                data.push({ country: d.country, cases: d.cases })
            }
        }
        data.sort((c, d) => d.cases - c.cases)
        this.chartService.chart(data, '#s1')
    }

    goforward2 = () => {
        this.router.navigateByUrl('tabs-nav/graphs/2')
    }
}
