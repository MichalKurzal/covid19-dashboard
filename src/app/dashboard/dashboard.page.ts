import { Component, OnInit } from '@angular/core'
import { AppserviceService } from '../services/appservice.service'
import { NavController, LoadingController } from '@ionic/angular'
import { Router } from '@angular/router'
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'
import { DataCont } from './../data-cont'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    providers: [AppserviceService],
})
export class DashboardPage implements OnInit {
    data
    svg: any
    svg2: any

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
        private screenOrientation: ScreenOrientation
    ) {}

    async ngOnInit() {
        console.log('ngAfterViewInit')
        const loading = this.loading.create({
            spinner: 'circles',
            message: 'Loading Please Wait...',
        })
        ;(await loading).present().then(async () => {
            Promise.all([
                this.loadContinents(),
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

    loadHistorical = async () => {
        return await this.appservice
            .HistoricalData()
            .then((data: any) => {
                console.log('Historical ', data)
                const cases = data.cases
                const deaths = data.deaths
                console.log('cases', cases)
                console.log('deaths', deaths)
                this.nativeStorage.setItem('DataWorld', data).then(
                    () => console.log('stored Item Data World'),
                    (error) => console.error('Error stoting item', error)
                )
                this.appservice.worldchart(
                    cases,
                    deaths,
                    this.svg,
                    this.svg2,
                    '#svg3',
                    '#svg4',
                    'g3',
                    'g4'
                )
            })
            .catch((error) => {
                console.log('error ', error)
                this.getDataWorld()
            })
    }

    loadContinents = async () => {
        return await this.appservice
            .NewApiContinents()
            .then((res) => {
                const ContArray = []
                for (const cases in res) {
                    ContArray.push(res[cases])
                }

                this.dataCont.cases = ContArray.map((c) => c.cases).reduce(
                    (a, b) => a + b
                )
                this.dataCont.newCases = ContArray.map(
                    (c) => c.todayCases
                ).reduce((a, b) => a + b)
                this.dataCont.deaths = ContArray.map((c) => c.deaths).reduce(
                    (a, b) => a + b
                )
                this.dataCont.NewDeaths = ContArray.map(
                    (c) => c.todayDeaths
                ).reduce((a, b) => a + b)
                this.dataCont.recovered = ContArray.map(
                    (c) => c.recovered
                ).reduce((a, b) => a + b)
                this.dataCont.NewRecovered = ContArray.map(
                    (c) => c.todayRecovered
                ).reduce((a, b) => a + b)

                console.log('DataCont', this.dataCont)

                this.nativeStorage
                    .setItem('DataContinents', this.dataCont)
                    .then(
                        () => console.log('stored Item'),
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
                console.log('Countries data', res)
                const result = []
                for (const code in res) {
                    result.push(res[code])
                }
                this.nativeStorage
                    .setItem('DataCountries', res)
                    .then(
                        () => console.log('stored Item'),
                        (error) => console.error('Error stoting item', error)
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
                    '#svg4',
                    'g3',
                    'g4'
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

    goforward = () => {
        this.router.navigateByUrl('tabs-nav/graphs1')

        console.log('goforward')
    }

    goforward2 = () => {
        this.router.navigateByUrl('tabs-nav/graphs2')

        console.log('goforward')
    }

    doRefresh(event) {
        Promise.all([
            this.loadHistorical(),
            this.loadCountriesData(),
            this.loadContinents(),
        ]).then(() => event.target.complete())
    }
}
