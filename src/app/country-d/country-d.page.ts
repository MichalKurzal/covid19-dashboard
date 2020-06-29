import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService } from '../services/appservice.service';
import * as d3 from "d3";

@Component({
  selector: 'app-country-d',
  templateUrl: './country-d.page.html',
  styleUrls: ['./country-d.page.scss'],
})
export class CountryDPage implements OnInit {
cc : any;
cn :any;
ncon :any;
nd: any;
nr:any;
tc:any;
tr: any;
td:any;
slug: any;
dayone :any;
dayL : any;
svg :any;


  constructor(private route: ActivatedRoute, public appservice : AppserviceService) {
   
   }

  ngOnInit() {
 




this.code();
  }
code =  () =>{
 
  this.route.queryParams.subscribe(async params => {
let c = params["country"];
 this.cc = c.CountryCode;
 this.cn = c.Country;
 this.ncon = c.NewConfirmed;
 this.nd = c.NewDeaths;
 this.nr = c.NewRecovered;
 this.tc = c.TotalConfirmed;
 this.td = c.TotalDeaths;
 this.tr = c.TotalRecovered;
 this.slug = c.Slug;

this.appservice.getDayOne(this.slug).subscribe(data =>{

this.dayone = Object.entries(data);

console.log(this.dayone);
this.dayL = this.dayone.length;
console.log(this.dayL);

 let dayone102 = this.dayone.slice(this.dayL -20);
 let dayone10= [];
for  (let d of dayone102){

 
  dayone10.push(d[1]);
 
}


console.log(dayone10);
let domain = dayone10[19].Cases + 0.4 * dayone10[9].Cases;

const xScale = d3.scaleBand().domain(dayone10.map((dataPoint)=>dataPoint.Date)).rangeRound([0,350]).padding(0.1);
  const yScale = d3.scaleLinear().domain([0,domain]).range([350,0]);

  const y_axis = d3.axisRight().scale(yScale)

 
    this.svg = d3.select('#svg2')

.attr("viewBox", [0, 0, 350, 300])
//.attr("transform", "rotate(90)");


    this.svg.append("g")
        .attr("fill", "#D42424")
      .selectAll("rect")
      .data(dayone10)
      .join("rect")
       .attr("x", (dayone10) => xScale(dayone10.Date))
      .attr("y", dayone10 => yScale(dayone10.Cases))
        .attr("height", (dayone10) =>350 - yScale(dayone10.Cases))
        .attr("width", xScale.bandwidth())

        this.svg.select(".y")
      .remove()
   
        this.svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0, 0)")
        .call(y_axis);
   
       

     
        //this.svg.attr("transform", "rotate(90)");
      
     console.log(this.svg)

})

 console.log(this.cc);
 console.log(this.cn);

  }) 
}
ionViewWillLeave(){
  console.log('wiil leave');
  this.svg.selectAll("rect")
  .attr("height", 0)
  .attr("width", 0)
 
}	
}
