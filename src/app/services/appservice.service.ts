import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import * as d3 from 'd3'

@Injectable({
    providedIn: 'root',
})
export class AppserviceService {
    url = 'https://disease.sh/v3/'
    Url2 = 'https://corona.lmao.ninja/v2/'

    headers = new HttpHeaders()
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')

    constructor(private http: HttpClient) {}

    WorldwideData() {
        return this.http
            .get(`${this.url}covid-19/all`, { headers: this.headers })
            .toPromise()
    }

    HistoricalData() {
        return this.http
            .get(`${this.url}covid-19/historical/all?lastdays=100`, {
                headers: this.headers,
            })
            .toPromise()
    }

    getCountriesData() {
        return this.http
            .get(`${this.Url2}countries?sort=country`, {
                headers: this.headers,
            })
            .toPromise()
    }
    HistoricalCountry(country) {
        return this.http
            .get(`${this.Url2}historical/${country}?lastdays=100`, {
                headers: this.headers,
            })
            .toPromise()
    }

    setWidthAndHeight() {
        const realheight = window.innerHeight
        let width = window.innerWidth
        let ratio = realheight / width
        if (width > 800) {
            width = 800
        }
        if (ratio < 1.45) {
            ratio = 1.45
        }
        const ratio2 = 4 - ratio
        const height = width / ratio2
        return { width, height }
    }

    worldchart = (data, svg, id, text, color) => {
        const { width, height } = this.setWidthAndHeight()

        const data_ = Object.values(data)
            .map((c: number, i: number) => [{ day: c, nr: i }])
            .map((c) => c[0])
        const domain =
            data_[data_.length - 1].day + 0.1 * data_[data_.length - 1].day
        const xScale = d3
            .scaleBand()
            .domain(data_.map((dataPoint) => dataPoint.nr))
            .rangeRound([0, width + 15])
        const yScale = d3.scaleLinear().domain([0, domain]).range([height, 0])
        const yaxis = d3.axisRight().scale(yScale)
        const curve = d3.curveLinear
        const area = d3
            .area()
            .curve(curve)
            .x((d) => xScale(d.nr))
            .y0(yScale(0))
            .y1((d) => yScale(d.day))

        svg = d3.select(`${id}`).attr('viewBox', [0, 0, width, height])
        svg.attr('display', 'initial')
        svg.select('.area').remove()
        svg.append('path')
            .attr('class', 'area')
            .datum(data_)
            .attr('fill', color)
            .attr('d', area)

        svg.append('text')
            .attr('text-anchor', 'start')
            .attr('dy', 20)
            .attr('dx', 60)
            .attr('font-size', 16)
            .style('fill', '#3880ff')
            .text(`Confirmed ${text} in the last 100 days`)
        svg.select('.y').remove()

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(0, 0)')
            .call(yaxis)
    }

    chart = (data, id) => {
        const Length = data.length
        const domain = data[Length - 1].cases + 0.2 * data[Length - 1].cases
        const xScale = d3
            .scaleBand()
            .domain(data.map((dataPoint) => dataPoint.country))
            .rangeRound([0, 600])
            .padding(0.1)
        const yScale = d3.scaleLinear().domain([0, domain]).range([600, 0])
        const y_axis = d3.axisRight().scale(yScale)

        const svg = d3.select(id).attr('viewBox', [0, 0, 600, 900])

        svg.append('g')
            .attr('fill', '#D42424')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (data) => xScale(data.country))
            .attr('y', (data) => yScale(data.cases))
            .attr('height', (data) => 600 - yScale(data.cases))
            .attr('width', xScale.bandwidth())

        svg.append('g')
            .attr('transform', 'translate(0,600)') // This controls the vertical position of the Axis
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('transform', 'translate(-15,15)rotate(-90)')
            .style('text-anchor', 'end')
            .style('font-size', 24)
            .style('fill', '#69a3b2')

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(0, 0)')
            .style('font-size', 24)
            .call(y_axis)
    }
}
