import { Component, OnInit } from '@angular/core'
import * as d3 from 'd3'
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { Router } from '@angular/router'

@Component({
    selector: 'app-graphs1',
    templateUrl: './graphs1.page.html',
    styleUrls: ['./graphs1.page.scss'],
})
export class Graphs1Page implements OnInit {
    constructor(private nativeStorage: NativeStorage, public router: Router) {}

    ngOnInit() {
        this.getdata()
    }

    getdata() {
        let dataL = []
        const dataM = []
        this.nativeStorage.getItem('DataCountries').then((res) => {
            dataL = res
            for (const d of dataL) {
                if (d.cases > 5000000) {
                    dataM.push(d)
                }
            }

            dataM.sort((a, b) => a.cases - b.cases)
            console.log('dataL', dataL)
            console.log('dataM', dataM)
            this.chart(dataM)
        })
    }
    chart = (data) => {
        const Length = data.length
        const domain = data[Length - 1].cases + 0.2 * data[Length - 1].cases
        const xScale = d3
            .scaleBand()
            .domain(data.map((dataPoint) => dataPoint.country))
            .rangeRound([0, 600])
            .padding(0.1)
        const yScale = d3.scaleLinear().domain([0, domain]).range([600, 0])
        const y_axis = d3.axisRight().scale(yScale)

        const svg = d3.select('#s1').attr('viewBox', [0, 0, 600, 900])

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
            .style('font-size', 20)
            .style('fill', '#69a3b2')

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(0, 0)')
            .style('font-size', 24)
            .call(y_axis)
    }

    goforward2 = () => {
        this.router.navigateByUrl('tabs-nav/graphs2')

        console.log('goforward')
    }
}
