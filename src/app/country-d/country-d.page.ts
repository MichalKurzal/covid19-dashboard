import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AppserviceService } from '../services/appservice.service'
import { DataCont } from '../data-cont'
import * as d3 from 'd3'

@Component({
    selector: 'app-country-d',
    templateUrl: './country-d.page.html',
    styleUrls: ['./country-d.page.scss'],
})
export class CountryDPage implements OnInit {
    country: any
    countryCode: any
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
        private route: ActivatedRoute,
        public appservice: AppserviceService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(async (params) => {
            const countryData = params.country
            this.countryCode = countryData?.countryInfo.iso2
            this.getHistoricalData(countryData?.countryInfo.iso2)

            this.country = countryData?.country
            this.dataCont.newCases = countryData?.todayCases
            this.dataCont.NewDeaths = countryData?.todayDeaths
            this.dataCont.NewRecovered = countryData?.todayRecovered
            this.dataCont.cases = countryData?.cases
            this.dataCont.deaths = countryData?.deaths
            this.dataCont.recovered = countryData?.recovered
            return await countryData
        })
    }

    getHistoricalData = (code) => {
        this.appservice
            .HistoricalCountry(code)
            .then((data: any) => {
                const cases = data.timeline.cases
                const deaths = data.timeline.deaths
                this.appservice.worldchart(
                    cases,
                    deaths,
                    this.svg,
                    this.svg2,
                    '#svg1',
                    '#svg2',
                    'g1',
                    'g2'
                )
            })
            .catch((error) => {
                console.log('Cannot get Data for this Country - Error', error)
                this.svg = d3.select('#svg1').attr('viewBox', [0, 0, 0, 0])
                this.svg2 = d3.select('#svg2').attr('viewBox', [0, 0, 0, 0])
                this.svg.attr('display', 'none')
                this.svg2.attr('display', 'none')
            })
    }
}
