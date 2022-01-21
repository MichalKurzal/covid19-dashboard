import { Component, OnInit, ViewChild } from '@angular/core'
import { NavController, Platform, NavParams } from '@ionic/angular'
import { NavigationExtras } from '@angular/router'
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { IonInfiniteScroll } from '@ionic/angular'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    providers: [NavParams, NativeStorage]
})
export class HomePage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll
    countries: any = []
    dataList: any = []
    itemLimit: number = 20

    constructor(
        public nav: NavController,
        public platform: Platform,
        public navParams: NavParams,
        private nativeStorage: NativeStorage
    ) {}
    ngOnInit() {
        this.nativeStorage
            .getItem('DataCountries')
            .then((res) => {
                this.countries = res
                this.countries.reverse()
                this.dataList = this.countries.slice(0, this.itemLimit)
                console.log('dataList', this.dataList)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    goforward = (param) => {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                country: param,
            },
        }
        this.nav.navigateForward('tabs-nav/countryD', navigationExtras)
    }

    loadData(event) {
        setTimeout(() => {
            this.itemLimit += 20
            this.dataList = this.countries.slice(0, this.itemLimit)
            event.target.complete()
        }, 500)
    }
}
