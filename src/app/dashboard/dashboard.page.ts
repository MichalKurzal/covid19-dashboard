import { Component, OnInit } from '@angular/core'
import { ChartService } from '../services/chart.service'
import { HttpService } from '../services/http.service'
import { NavController, LoadingController, Platform } from '@ionic/angular'
import { Router } from '@angular/router'
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { Dashboard } from '../interfaces/data-cont'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    providers: [ChartService, NativeStorage, ScreenOrientation],
})
export class DashboardPage implements OnInit {
    svg: any
    svg2: any
    today: number
    icon: string = 'sunny-outline'

    dataCont: Dashboard = {
        cases: 0,
        todayCases: 0,
        todayDeaths: 0,
        deaths: 0,
        recovered: 0,
        todayRecovered: 0,
    }

    constructor(
        public chartservice: ChartService,
        public httpService: HttpService,
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

    changeTheme() {
        const theme = document.body.getAttribute('color-theme')
        if (theme === 'dark') {
            document.body.setAttribute('color-theme', 'light')
            this.icon = 'moon-outline'
        } else {
            document.body.setAttribute('color-theme', 'dark')
            this.icon = 'sunny-outline'
        }
    }

    loadHistorical = async () => {
        return await this.httpService
            .HistoricalData()
            .then((data: any) => {
                this.chartservice.worldchart(
                    data.cases,
                    this.svg,
                    '#svg3',
                    'cases',
                    '#66add4'
                )

                this.chartservice.worldchart(
                    data.deaths,
                    this.svg2,
                    '#svg4',
                    'deaths',
                    '#da7a88'
                )

                if (this.platform.is('cordova')) {
                    this.nativeStorage.setItem('DataWorld', data).then(
                        () => console.log('stored Item HistoricalData'),
                        (error) => console.error('Error stoting item', error)
                    )
                }
            })
            .catch((error) => {
                console.log('error ', error)
                this.getDataWorld()
            })
    }

    loadWorldwideData = async () => {
        return await this.httpService
            .WorldwideData()
            .then((res: Dashboard) => {
                this.dataCont = res
                this.today = Date.now()
            })
            .then(() => {
                if (this.platform.is('cordova')) {
                    this.nativeStorage
                        .setItem('DataContinents', this.dataCont)
                        .then(
                            () => console.log('stored Item WorldwideData'),
                            (err) => console.error('Error storing item', err)
                        )
                }
            })
            .catch((error) => {
                console.log('catch error get Global', error)
                this.getDataCont()
            })
    }

    loadCountriesData = async () => {
        return await this.httpService
            .getCountriesData()
            .then((res) => {
                if (this.platform.is('cordova')) {
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
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getDataCont = () => {
        if (this.platform.is('cordova')) {
            this.nativeStorage
                .getItem('DataContinents')
                .then((res: Dashboard) => {
                    this.dataCont = res
                })
                .catch((error) => {
                    console.log('error', error)
                })
        }
    }

    getDataWorld = () => {
        if (this.platform.is('cordova')) {
            this.nativeStorage
                .getItem('DataWorld')
                .then((res) => {
                    const cases = res.cases
                    const deaths = res.deaths
                    this.chartservice.worldchart(
                        cases,
                        this.svg,
                        '#svg3',
                        'cases',
                        '#66add4'
                    )

                    this.chartservice.worldchart(
                        deaths,
                        this.svg2,
                        '#svg4',
                        'deaths',
                        '#da7a88'
                    )
                })
                .catch((error) => {
                    console.log('error ', error)
                })
        }
    }

    goforward = () => this.router.navigateByUrl('tabs-nav/graphs')

    doRefresh(event) {
        Promise.all([
            this.loadHistorical(),
            this.loadCountriesData(),
            this.loadWorldwideData(),
        ]).then(() => event.target.complete())
    }
}
