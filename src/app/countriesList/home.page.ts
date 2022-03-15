import { Component, OnInit, ViewChild } from '@angular/core'
import { NavController, NavParams } from '@ionic/angular'
import { NavigationExtras } from '@angular/router'
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { IonInfiniteScroll } from '@ionic/angular'
import { country } from '../interfaces/country'

@Component({
    selector: 'app-countries',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    providers: [NavParams, NativeStorage],
})
export class CountriesListPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll
    countries: country[] = []
    dataList: country[] = []
    templist: country[] = []
    itemLimit = 20

    constructor(
        public nav: NavController,
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
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    onInput(e) {
        this.templist = this.countries.filter((country) =>
            country.country.toLowerCase().includes(e.target.value.toLowerCase())
        )
        this.dataList = this.templist.slice(0, this.itemLimit)
    }

    goforward = (param: country) => {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                country: param,
            },
        }
        console.log(navigationExtras)
        this.nav.navigateForward('tabs-nav/countryD', navigationExtras)
    }

    loadData(event) {
        setTimeout(() => {
            this.itemLimit += 20
            if (this.templist.length > 0)
                this.dataList = this.templist.slice(0, this.itemLimit)
            else this.dataList = this.countries.slice(0, this.itemLimit)

            event.target.complete()
        }, 500)
    }
}
