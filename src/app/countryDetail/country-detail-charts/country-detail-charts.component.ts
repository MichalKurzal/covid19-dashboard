import { Component, Input, OnInit } from '@angular/core'
import * as d3 from 'd3'
import { AppserviceService } from 'src/app/services/appservice.service'

@Component({
    selector: 'app-country-detail-charts',
    templateUrl: './country-detail-charts.component.html',
    styleUrls: ['./country-detail-charts.component.scss'],
})
export class CountryDetailChartsComponent implements OnInit {
    svg: any
    svg2: any
    @Input()
    set cases(cases: {}) {
        this.svg = d3.select('#svg1').attr('viewBox', [0, 0, 0, 0])
        if (cases !== null && cases !== undefined)
            this.appservice.worldchart(
                cases,
                this.svg,
                '#svg1',
                'cases',
                '#66add4'
            )
        else this.svg.attr('display', 'none')
    }
    @Input()
    set deaths(deaths: {}) {
        this.svg2 = d3.select('#svg2').attr('viewBox', [0, 0, 0, 0])
        if (deaths !== null && deaths !== undefined)
            this.appservice.worldchart(
                deaths,
                this.svg2,
                '#svg2',
                'deaths',
                '#da7a88'
            )
        else this.svg2.attr('display', 'none')
    }
    constructor(public appservice: AppserviceService) {}

    ngOnInit(): void {
        this.svg = d3.select('#svg1').attr('viewBox', [0, 0, 0, 0])
        this.svg2 = d3.select('#svg2').attr('viewBox', [0, 0, 0, 0])
    }
}
