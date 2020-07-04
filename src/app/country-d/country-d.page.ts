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
dayoneAU :any;

  constructor(private route: ActivatedRoute, public appservice : AppserviceService) {
   
   }

  ngOnInit() {
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

  
   
      if ((this.cc !== 'AU')&&(this.cc !== 'CN')&&(this.cc !== 'CA')) {
        this.appservice.getDayOne(this.slug).subscribe(async data =>{

          console.log(data)
        this.dayone = Object.entries(data);
        this.code();
        
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
  
     this.dayoneAU = sum;
     console.log('dayone210 T  ',this.dayoneAU);
     this.code();
      })
     } 
    })
  }

code =  () =>{

let dayone20= [];
if (this.cc == 'AU'){
  dayone20 = this.dayoneAU;
}
else if  (this.cc == 'CN'){
  dayone20 = this.dayoneAU;
}
else if  (this.cc == 'CA'){
  dayone20 = this.dayoneAU;
}
else{
  for  (let d of this.dayone){
    if (d[1].Province == '')  
    {
      dayone20.push(d[1]);
    }
    
  }
  
  console.log('dayone20 ', dayone20);
}
console.log(window.innerWidth);
let width = window.innerWidth;

if (width > 600)
{
  width = 400;
}
this.dayL = dayone20.length;
 let dayone210 = dayone20.slice(this.dayL -20);

let domain = dayone210[19].Cases + 0.4 * dayone210[9].Cases;

const xScale = d3.scaleBand().domain(dayone210.map((dataPoint)=>dataPoint.Date)).rangeRound([0,width]).padding(0.1);
  const yScale = d3.scaleLinear().domain([0,domain]).range([width,0]);

  const y_axis = d3.axisRight().scale(yScale)

    this.svg = d3.select('#svg2')

.attr("viewBox", [0, 0, width, 360])

    this.svg.append("g")
        .attr("fill", "#D42424")
      .selectAll("rect")
      .data(dayone210)
      .join("rect")
       .attr("x", (dayone210) => xScale(dayone210.Date))
      .attr("y", dayone210 => yScale(dayone210.Cases))
        .attr("height", (dayone210) =>width - yScale(dayone210.Cases))
        .attr("width", xScale.bandwidth())

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
  this.svg.selectAll("rect")
  .attr("height", 0)
  .attr("width", 0)
 
}	
}