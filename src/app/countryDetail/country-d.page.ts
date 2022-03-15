import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { HttpService } from '../services/http.service'
import { DataCont } from '../interfaces/data-cont'

@Component({
    selector: 'app-country-d',
    templateUrl: './country-d.page.html',
    styleUrls: ['./country-d.page.scss'],
})
export class CountryDPage implements OnInit {
    cases: {}
    deaths: {}

    dataCont: DataCont = {
        cases: 0,
        todayCases: 0,
        todayDeaths: 0,
        deaths: 0,
        recovered: 0,
        todayRecovered: 0,
        country: '',
        countryInfo: {
            iso2: '',
        },
    }

    constructor(
        private route: ActivatedRoute,
        public httpService: HttpService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.cases = null
            this.deaths = null
            this.dataCont = params.country
            this.getHistoricalData(this.dataCont.countryInfo.iso2)
        })
    }

    getHistoricalData = (code) => {
        this.httpService
            .HistoricalCountry(code)
            .then((data: any) => {
                this.cases = data.timeline.cases
                this.deaths = data.timeline.deaths
            })
            .catch((error) => {
                console.log('Cannot get Data for this Country - Error', error)
                ;(this.cases = null), (this.deaths = null)
            })
    }
}
