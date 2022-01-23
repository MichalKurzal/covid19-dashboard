import { Component, OnInit } from '@angular/core'
import { AppserviceService } from '../services/appservice.service'
import { NavController, LoadingController, Platform } from '@ionic/angular'
import { Router } from '@angular/router'
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { DataCont } from './../data-cont'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    providers: [AppserviceService, NativeStorage, ScreenOrientation],
})
export class DashboardPage implements OnInit {
    data
    svg: any
    svg2: any
    today: Number

    dataCont: DataCont = {
        cases: 0,
        newCases: 0,
        NewDeaths: 0,
        deaths: 0,
        recovered: 0,
        NewRecovered: 0,
    }

    constructor(
        public appservice: AppserviceService,
        public nav: NavController,
        public router: Router,
        private nativeStorage: NativeStorage,
        public loading: LoadingController,
        private screenOrientation: ScreenOrientation,
        public platform: Platform
    ) {}

    async ngOnInit() {
        const loading = this.loading.create({
            spinner: 'circles',
            message: 'Loading Please Wait...',
        })
        ;(await loading).present().then(async () => {
            Promise.all([
                this.loadWorldwideData(),
                this.loadHistorical(),
                this.loadCountriesData(),
            ]).then(async () => (await loading).dismiss())
        })
    }

    ngAfterViewInit() {
        if (window.innerWidth < 900) {
            try {
                this.screenOrientation.lock(
                    this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
                )
            } catch (e) {
                console.log(e)
            }
            console.log(navigator.userAgent)
        }
    }

    onToggleColorTheme(event) {
        console.log(event.detail.checked)
        if (event.detail.checked) {
            document.body.setAttribute('color-theme', 'light')
        } else {
            document.body.setAttribute('color-theme', 'dark')
        }
    }

    loadHistorical = async () => {
        return await this.appservice
            .HistoricalData()
            .then((data: any) => {
                const cases = data.cases
                const deaths = data.deaths
                if (this.platform.is('cordova')) {
                    this.nativeStorage.setItem('DataWorld', data).then(
                        () => console.log('stored Item HistoricalData'),
                        (error) => console.error('Error stoting item', error)
                    )
                }
                this.appservice.worldchart(
                    cases,
                    deaths,
                    this.svg,
                    this.svg2,
                    '#svg3',
                    '#svg4'
                )
            })
            .catch((error) => {
                console.log('error ', error)
                this.getDataWorld()
            })
    }

    loadWorldwideData = async () => {
        return await this.appservice
            .WorldwideData()
            .then((res) => {
                ;(this.dataCont.cases = res['cases']),
                    (this.dataCont.newCases = res['todayCases']),
                    (this.dataCont.deaths = res['deaths']),
                    (this.dataCont.NewDeaths = res['todayDeaths']),
                    (this.dataCont.recovered = res['recovered']),
                    (this.dataCont.NewRecovered = res['todayRecovered'])
                this.today = Date.now()
            })
            .then(() => {
                if (this.platform.is('cordova'))
                    this.nativeStorage
                        .setItem('DataContinents', this.dataCont)
                        .then(
                            () => console.log('stored Item WorldwideData'),
                            (err) => console.error('Error storing item', err)
                        )
            })
            .catch((error) => {
                console.log('catch error get Global', error)
                this.getDataCont()
            })
    }

    loadCountriesData = async () => {
        return await this.appservice
            .getCountriesData()
            .then((res) => {
                if (this.platform.is('cordova'))
                    this.nativeStorage
                        .setItem('DataCountries', res)
                        .then(
                            () => console.log('stored Item CountriesData'),
                            (error) =>
                                console.error('Error stoting item', error)
                        )
                        .catch((error) => {
                            console.log('error', error)
                        })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getDataCont = () => {
        if (this.platform.is('cordova'))
            this.nativeStorage
                .getItem('DataContinents')
                .then((res) => {
                    const data = res
                    console.log('get Data', data)
                    this.setTotal(data)
                })
                .catch((error) => {
                    console.log('error', error)
                })
    }

    getDataWorld = () => {
        if (this.platform.is('cordova'))
            this.nativeStorage
                .getItem('DataWorld')
                .then((res) => {
                    const cases = res.cases
                    const deaths = res.deaths
                    this.appservice.worldchart(
                        cases,
                        deaths,
                        this.svg,
                        this.svg2,
                        '#svg3',
                        '#svg4'
                    )
                })
                .catch((error) => {
                    console.log('error ', error)
                })
    }

    setTotal = (data) => {
        console.log(data)
        this.dataCont.cases = data.cases
        this.dataCont.newCases = data.newCases
        this.dataCont.NewDeaths = data.NewDeaths
        this.dataCont.deaths = data.deaths
        this.dataCont.recovered = data.recovered
        this.dataCont.NewRecovered = data.NewRecovered
    }

    goforward = () => this.router.navigateByUrl('tabs-nav/graphs1')
    goforward2 = () => this.router.navigateByUrl('tabs-nav/graphs2')

    doRefresh(event) {
        Promise.all([
            this.loadHistorical(),
            this.loadCountriesData(),
            this.loadWorldwideData(),
        ]).then(() => event.target.complete())
    }
}
