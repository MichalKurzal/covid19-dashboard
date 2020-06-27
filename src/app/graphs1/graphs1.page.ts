import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { AppserviceService } from '../services/appservice.service';

@Component({
  selector: 'app-graphs1',
  templateUrl: './graphs1.page.html',
  styleUrls: ['./graphs1.page.scss'],
})
export class Graphs1Page implements OnInit {


  constructor(public appservice : AppserviceService) { }

  ngOnInit() {
    console.log(d3);
    this.chart();
   
  }
  
  chart (){
    let dataC;
    let dataL = [];
    let dataM = [];
    this.appservice.getGlobal().subscribe(res =>{
dataC = res;
dataL = dataC.Countries;
for(let d of dataL)
{
  if (d.TotalConfirmed > 100000)
  {
    dataM.push(d)
  }
}
console.log('dataL', dataL);
console.log('dataM', dataM);

const xScale = d3.scaleBand().domain(dataM.map((dataPoint)=>dataPoint.Country)).rangeRound([0,600]).padding(0);
  const yScale = d3.scaleLinear().domain([0,3000000]).range([600,0]);

    const svg = d3.select("svg")
        .attr("viewBox", [0, 0, 600, 900]);
  
    svg.append("g")
        .attr("fill", 'red')
      .selectAll("rect")
      .data(dataM)
      .join("rect")
       .attr("x", (dataM) => xScale(dataM.Country))
      .attr("y", dataM => yScale(dataM.TotalConfirmed))
        .attr("height", (dataM) =>600 - yScale(dataM.TotalConfirmed))
        .attr("width", xScale.bandwidth());

        svg
        .append("g")
        .attr("transform", "translate(0,600)")      // This controls the vertical position of the Axis
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-10,10)rotate(-90)")
        .style("text-anchor", "end")
        .style("font-size", 20)
        .style("fill", "#69a3b2")
    });

   let data = [
     {id:1, value:17},
     {id:2, value:5},
     {id:3, value:12},
     {id:4, value:24},
   ]
  
  }
}
