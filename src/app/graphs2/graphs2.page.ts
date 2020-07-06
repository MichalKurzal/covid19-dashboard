import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { AppserviceService } from '../services/appservice.service';

@Component({
  selector: 'app-graphs2',
  templateUrl: './graphs2.page.html',
  styleUrls: ['./graphs2.page.scss'],
})
export class Graphs2Page implements OnInit {

  constructor(public appservice : AppserviceService) { }

  ngOnInit() {
    this.chart();

  }
  chart (){
    let dataC;
    let dataL = [];
    let dataM = [];
    this.appservice.getGlobal().then(res =>{
dataC = res;
dataL = dataC.Countries;
for(let d of dataL)
{
  if (d.TotalDeaths > 10000)
  {
    dataM.push(d)
  }
}

dataM.sort(function(a, b) {
  return a.TotalDeaths - b.TotalDeaths;
});

console.log('dataL', dataL);
console.log('dataM', dataM);

let Length = dataM.length;
let domain = dataM[Length -1].TotalDeaths + 0.4 * dataM[Length -1].TotalDeaths;

const xScale = d3.scaleBand().domain(dataM.map((dataPoint)=>dataPoint.Country)).rangeRound([0,600]).padding(0.1);
  const yScale = d3.scaleLinear().domain([0,domain]).range([600,0]);

  const y_axis = d3.axisRight().scale(yScale)

    const svg = d3.select("#s2")
        .attr("viewBox", [0, 0, 600, 900]);
  
    svg.append("g")
        .attr("fill", "#D42424")
      .selectAll("rect")
      .data(dataM)
      .join("rect")
       .attr("x", (dataM) => xScale(dataM.Country))
      .attr("y", dataM => yScale(dataM.TotalDeaths))
        .attr("height", (dataM) =>600 - yScale(dataM.TotalDeaths))
        .attr("width", xScale.bandwidth());

        svg
        .append("g")
        .attr("transform", "translate(0,600)")      // This controls the vertical position of the Axis
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-15,15)rotate(-90)")
        .style("text-anchor", "end")
        .style("font-size", 24)
        .style("fill", "#69a3b2")

        svg.append('text')
        .attr('text-anchor', 'start')
        .attr("dy", 30)
        .attr("dx", 30)
        .attr("font-size", 18)
        .text('Countries with more than 10 000 deaths')

        svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0, 0)")
        .call(y_axis);

    });

   let data = [
     {id:1, value:17},
     {id:2, value:5},
     {id:3, value:12},
     {id:4, value:24},
   ]
  
  }
}
