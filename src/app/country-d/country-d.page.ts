import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService } from '../services/appservice.service';
import * as d3 from "d3";
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {File} from '@ionic-native/file/ngx';

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
dayoneAU :any;
gurl

  constructor(private route: ActivatedRoute, public appservice : AppserviceService, private WebView : WebView, private file: File) {
   
   }

  ngOnInit() {
    this.gurl =  this.WebView.convertFileSrc( this.file.dataDirectory);
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
     
       console.log(this.cc);
       console.log(this.cn);
       //this.getData();
       this.getHistoricalData();
       return await c;

  

     
    })
  }

getHistoricalData = ()=>{
this.appservice.HistoricalCountry(this.cn).then(data=>{
  let time = [];
  let arraydata = [];
  let timearray = []
  
  for(let d in data){
    arraydata.push(data[d])
  }
 time = arraydata[2];
 for (let t in time)
 {
   timearray.push(time[t])
 }
 console.log('historical ', timearray);
 this.code(timearray);
  
})
}

code =  (data) =>{
let dayone20 =[];
let Cases = [];
let days = [];
days =data[0];
Cases = Object.values(days)
for (let c of Cases){
  dayone20.push({Cases: c, Date: c.toString()})
}

  console.log('dayone20 ', dayone20);

console.log(window.innerWidth);
let width = window.innerWidth;

if (width > 800)
{
  width = 800;
}
let height = width -50;
this.dayL = dayone20.length;
console.log(dayone20);
 let dayone210 = dayone20;

let domain = dayone210[dayone210.length -1].Cases + 0.2 * dayone210[dayone210.length -1].Cases;
console.log('domain', domain)

const xScale = d3.scaleBand().domain(dayone210.map((dataPoint)=>dataPoint.Date)).rangeRound([0,width]).padding(0.1);
const yScale = d3.scaleLinear().domain([0,domain]).range([height,0]);

  let curve = d3.curveLinear;

  
  let area = d3.area()
  .curve(curve)
  .x(d => xScale(d.Date))
  .y0(yScale(0))
  .y1(d => yScale(d.Cases))

  const y_axis = d3.axisRight().scale(yScale)

    this.svg = d3.select('#svg2')

.attr("viewBox", [0, 0, width, height])

var gradient = this.svg.append("svg:defs")
         .append("svg:linearGradient")
           .attr("id", "gradient")
           .attr("x1", "0%")
           .attr("y1", "0%")
          .attr("x2", "100%")
           .attr("y2", "0%")
           .attr("spreadMethod", "pad");
    gradient.append("svg:stop")
           .attr("offset", "0%")
           .attr("stop-color", "#19ACD4")
           .attr("stop-opacity", 0.6);
    gradient.append("svg:stop")
           .attr("offset", "100%")
           .attr("stop-color", "#0B1BA4")
           .attr("stop-opacity", 0.6);

    this.svg.append("path")
        //.attr("fill", "#D42424")
        .attr("class", "area")
        .attr("fill", "url(#gradient)")
      .datum(dayone210)
      .attr('d', area)


        this.svg.select(".y")
      .remove()
   
        this.svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0, 0)")
        .call(y_axis);
      
     console.log(this.svg)

};
ionViewWillLeave(){
  console.log('wiil leave');
  this.svg.selectAll(".area")
   .remove()
}	
}