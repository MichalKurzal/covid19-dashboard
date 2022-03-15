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
        newCases: 0,
        NewDeaths: 0,
        deaths: 0,
        recovered: 0,
        NewRecovered: 0,
        country: '',
        countryCode: '',
    }

    constructor(
        private route: ActivatedRoute,
        public httpService: HttpService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.cases = null
            this.deaths = null
            const countryData = params.country
            this.getHistoricalData(countryData?.countryInfo.iso2)
            this.dataCont.countryCode = countryData?.countryInfo.iso2
            this.dataCont.country = countryData?.country
            this.dataCont.newCases = countryData?.todayCases
            this.dataCont.NewDeaths = countryData?.todayDeaths
            this.dataCont.NewRecovered = countryData?.todayRecovered
            this.dataCont.cases = countryData?.cases
            this.dataCont.deaths = countryData?.deaths
            this.dataCont.recovered = countryData?.recovered
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
