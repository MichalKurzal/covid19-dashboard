import { Component, OnInit } from '@angular/core'
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { Router } from '@angular/router'
import { Platform } from '@ionic/angular'
import { AppserviceService } from '../services/appservice.service'

@Component({
    selector: 'app-graphs2',
    templateUrl: './graphs2.page.html',
    styleUrls: ['./graphs2.page.scss'],
    providers: [NativeStorage],
})
export class Graphs2Page implements OnInit {
    constructor(
        private nativeStorage: NativeStorage,
        public appService: AppserviceService,
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
                if (d.deaths > 100000) {
                    data.push({ country: d.country, cases: d.deaths })
                }
            }
            data.sort((a, b) => a.cases - b.cases)
            this.appService.chart(data, '#s2')
        })
    }

    goforward = () => {
        this.router.navigateByUrl('tabs-nav/graphs')
    }
}
