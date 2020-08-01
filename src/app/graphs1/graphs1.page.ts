import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { AppserviceService } from '../services/appservice.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graphs1',
  templateUrl: './graphs1.page.html',
  styleUrls: ['./graphs1.page.scss'],
})
export class Graphs1Page implements OnInit {


  constructor(public appservice: AppserviceService, private nativeStorage: NativeStorage, public router: Router) { }

  ngOnInit() {
    this.chart();
  }

  chart(){
    let dataL = [];
    const dataM = [];
      this.nativeStorage.getItem('DataCountries').then(res => {
dataL = res;
for (const d of dataL)
{
  if (d.TotalConfirmed > 100000)
  {
    dataM.push(d);
  }
}

dataM.sort(function(a, b) {
  return a.TotalConfirmed - b.TotalConfirmed;
});
console.log('dataL', dataL);
console.log('dataM', dataM);
const Length = dataM.length;
const domain = dataM[Length - 1].TotalConfirmed + 0.4 * dataM[Length - 1].TotalConfirmed;

const xScale = d3.scaleBand().domain(dataM.map((dataPoint) => dataPoint.Country)).rangeRound([0, 600]).padding(0.1);
  const yScale = d3.scaleLinear().domain([0, domain]).range([600, 0]);

  const y_axis = d3.axisRight().scale(yScale);

    const svg = d3.select('#s1')
        .attr('viewBox', [0, 0, 600, 900]);

    svg.append('g')
        .attr('fill', '#D42424')
      .selectAll('rect')
      .data(dataM)
      .join('rect')
       .attr('x', (dataM) => xScale(dataM.Country))
      .attr('y', dataM => yScale(dataM.TotalConfirmed))
        .attr('height', (dataM) => 600 - yScale(dataM.TotalConfirmed))
        .attr('width', xScale.bandwidth());

        svg
        .append('g')
        .attr('transform', 'translate(0,600)')      // This controls the vertical position of the Axis
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'translate(-15,15)rotate(-90)')
        .style('text-anchor', 'end')
        .style('font-size', 24)
        .style('fill', '#69a3b2');



        svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(0, 0)')
        .call(y_axis);
    });

  }
  goforward2 = () => {

    this.router.navigateByUrl('tabs-nav/graphs2');

  console.log('goforward');
}
}
