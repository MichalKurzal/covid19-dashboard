import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { AppserviceService } from '../services/appservice.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graphs2',
  templateUrl: './graphs2.page.html',
  styleUrls: ['./graphs2.page.scss'],
})
export class Graphs2Page implements OnInit {

  constructor( public appservice: AppserviceService, private nativeStorage: NativeStorage, public router: Router) { }

  ngOnInit() {
    this.getdata();

  }
  getdata(){
    let dataL = [];
    const dataM = [];
    this.nativeStorage.getItem('DataCountries').then(res => {
dataL = res;
for (const d of dataL)
{
  if (d.TotalDeaths > 10000)
  {
    dataM.push(d);
  }
}

dataM.sort(function(a, b) {
  return a.TotalDeaths - b.TotalDeaths;
});

console.log('dataL', dataL);
console.log('dataM', dataM);
this.chart(dataM);
});

}
chart = (data) => {
  const Length = data.length;
  const domain = data[ Length - 1].TotalDeaths + 0.2 * data[ Length - 1].TotalDeaths;
  const xScale = d3.scaleBand().domain(data.map((dataPoint) => dataPoint.Country)).rangeRound([0, 600]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, domain]).range([600, 0]);
    const y_axis = d3.axisRight().scale(yScale);

      const svg = d3.select('#s2')
          .attr('viewBox', [0, 0, 600, 900]);

      svg.append('g')
          .attr('fill', '#D42424')
        .selectAll('rect')
        .data(data)
        .join('rect')
         .attr('x', (data) => xScale(data.Country))
        .attr('y', data => yScale(data.TotalDeaths))
          .attr('height', (data) => 600 - yScale(data.TotalDeaths))
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
          .style('font-size', 24)
          .call(y_axis);
}

  goforward = () => {

    this.router.navigateByUrl('tabs-nav/graphs1');

  console.log('goforward');
}
}
