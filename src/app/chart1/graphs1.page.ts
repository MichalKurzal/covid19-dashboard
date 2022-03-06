import { Component, OnInit } from '@angular/core'
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { Router } from '@angular/router'
import { Platform } from '@ionic/angular'
import { ChartService } from '../services/appservice.service'

@Component({
    selector: 'app-graphs1',
    templateUrl: './graphs1.page.html',
    styleUrls: ['./graphs1.page.scss'],
    providers: [NativeStorage],
})
export class Graphs1Page implements OnInit {
    constructor(
        private nativeStorage: NativeStorage,
        public chartService: ChartService,
        public router: Router,
        public platform: Platform
    ) {}

    ngOnInit() {
        if (this.platform.is('cordova')) {
            this.getdata()
        }
    }

    getdata() {
        const data = []
        this.nativeStorage.getItem('DataCountries').then((res) => {
            for (const d of res) {
                if (d.cases > 5000000) {
                    data.push({ country: d.country, cases: d.cases })
                }
            }
            data.sort((c, d) => c.cases - d.cases)
            this.chartService.chart(data, '#s1')
        })
    }

    goforward2 = () => {
        this.router.navigateByUrl('tabs-nav/graphs/2')
    }
}
