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
       this.getData();
       return await c;

  

     
    })
  }

getData = ()=>{
     
  if ((this.cc !== 'AU')&&(this.cc !== 'CN')) {
    this.appservice.getDayOne(this.slug).subscribe(async data =>{

      console.log(data)
    this.dayone = Object.entries(data);
    this.code(this.dayone);
    
  })
  }
 else{
   console.log('china or australia')
   this.appservice.getDayOne2(this.slug).subscribe(async data2 =>{


    let daysum = Object.entries(data2);
  
let daysum1 =[];
    for  (let d of daysum){
        daysum1.push(d[1]);
    }
    
  var   startDate = new Date("2020-06-01");
  var   endDate = new Date();
    var getDateArray = function(start, end) {

      var
        arr = new Array(),
        dt = new Date(start);
    
      while (dt <= end) {
        arr.push(new Date(dt).toISOString().split('.')[0]+"Z");
        dt.setDate(dt.getDate() + 1);
      }
    
      return arr;
    
    }
    var dateArr = getDateArray(startDate, endDate);

let sum = []
    console.log('daysum1', daysum1)
   let date1;
   let sumint = 0;
for (let date of dateArr)
{if (date1 !== date)
  {
    sum.push({Cases: sumint, Date: date})
    
    sumint = 0;
  } 

  for (let days of daysum1)
    {
     date1 = date;
      if(date == days.Date){
        sumint += (days.Cases)
      
      }
    }  
}

 this.dayoneAU = Object.entries(sum) ;
 this.dayoneAU.shift();
 this.dayoneAU.pop();
 console.log('dayone210 T  ',this.dayoneAU);
 this.code(this.dayoneAU);
  })
}
}
code =  (data) =>{
let dayone20 =[];

  for  (let d of data){
      dayone20.push(d[1]);
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
 let dayone210 = dayone20.slice(this.dayL -20);

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