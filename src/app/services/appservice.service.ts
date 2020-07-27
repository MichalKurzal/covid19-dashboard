import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as d3 from "d3";

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  Url = 'https://api.covid19api.com'
  Url2 = 'https://corona.lmao.ninja/v2/'
  url3 = 'https://restcountries.eu/rest/v2/all?fields=alpha2Code'

 

  constructor(private http:HttpClient, private NativeStorage :NativeStorage) { }

   getData(){
  return this.http.get(`${this.Url}/countries?offset=0`);
  }

  getGlobal(){
      return this.http.get(`${this.Url}/summary?offset=0`).toPromise()
  }
      getDayOne(country){
        return this.http.get(`${this.Url}/total/dayone/country/${country}/status/confirmed?offset=0`)
      }

      getDayOne2(country){
        return this.http.get(`${this.Url}/dayone/country/${country}/status/confirmed?offset=0`)
      }
      
      WorldTotal(){
        let date = new Date().toJSON();
        console.log('date ',date);
        return this.http.get(`${this.Url}/world?from=2020-06-01T00:00:00Z&to=${date}`).toPromise()
      }
      NewApiContinents(){
        return this.http.get(`${this.Url2}continents?false&sort`).toPromise();
      }
      HistoricalData(){
        return  this.http.get(`${this.Url2}historical/all`).toPromise();
      }
      getCountries(){
        return this.http.get(this.url3).toPromise();
      }
      HistoricalCountry(country){
      return this.http.get(`${this.Url2}historical/${country}?lastdays=30`).toPromise()
      }

      worldchart =(cases, deaths,svg1,svg2,id1,id2,g1,g2)=>{
        let WorldCon = [];
        let WorldDeaths = [];
    
       for (let d in cases)
       {
         WorldCon.push({day:cases[d],nr:cases[d].toString()})
       }
    console.log('chart cases',WorldCon)
      
       for (let td in deaths)
       {
        WorldDeaths.push({day :deaths[td],nr:deaths[td].toString()})
       }
       console.log('chart deaths',WorldDeaths)
        
       let world;
       world =WorldCon;
     
       let DeathsData;
       DeathsData = WorldDeaths;
       console.log('Deaths Data', DeathsData);
    
       let width = window.innerWidth;
    if (width > 800)
    {
      width = 800;
    }
    let realheight = window.innerHeight;
    let ratio = realheight / width;
    if (ratio< 1.45){
    ratio = 1.45;
    }
    console.log('ratio ',ratio);
    let ratio2 = 4-ratio;
    //let height = (width/2) * ratio;
    let height = width/ratio2;
    console.log('width ',width);
    console.log('height ', height)
    
       let domain = world[world.length -1].day + 0.1 * world[world.length -1].day;
       let domain2 = DeathsData[DeathsData.length-1].day + 0.1*DeathsData[DeathsData.length-1].day
    
      console.log('Final Data World ',world);
    
       const xScale = d3.scaleBand().domain(world.map((dataPoint)=>dataPoint.nr)).rangeRound([0,width+20]);
       const yScale = d3.scaleLinear().domain([0,domain]).range([height,0]);
       const xScale2 = d3.scaleBand().domain(DeathsData.map((dataPoint)=>dataPoint.nr)).rangeRound([0,width+20]);
       const yScale2 = d3.scaleLinear().domain([0,domain2]).range([height,0]);
    
       const y_axis = d3.axisRight().scale(yScale);
       const y_axis2 = d3.axisRight().scale(yScale2);
    
       let curve = d3.curveLinear;
       let curve2 = d3.curveLinear
    
       let area = d3.area()
       .curve(curve)
       .x(d => xScale(d.nr))
       .y0(yScale(0))
       .y1(d => yScale(d.day))
    
       let area2 = d3.area()
       .curve(curve2)
       .x(d => xScale2(d.nr))
       .y0(yScale(0))
       .y1(d => yScale2(d.day))
      
         svg1 = d3.select(`${id1}`)
     .attr("viewBox", [0, 0, width, height])
    
     svg2 = d3.select(`${id2}`)
     .attr("viewBox", [0, 0, width, height])
    
      
             var gradient = svg1.append("svg:defs")
             .append("svg:linearGradient")
               .attr("id", `${g1}`)
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
    
               var gradient2 = svg1.append("svg:defs")
               .append("svg:linearGradient")
                 .attr("id", `${g2}`)
                 .attr("x1", "0%")
                 .attr("y1", "0%")
                .attr("x2", "100%")
                 .attr("y2", "0%")
                 .attr("spreadMethod", "pad");
          gradient2.append("svg:stop")
                 .attr("offset", "0%")
                 .attr("stop-color", "#cf3e3e")
                 .attr("stop-opacity", 0.8);
          gradient2.append("svg:stop")
                 .attr("offset", "100%")
                 .attr("stop-color", "#FF0000")
                 .attr("stop-opacity", 0.8);
    
                 svg1.select(".area")
                 .remove()
                 svg2.select(".area")
                 .remove()

               svg1.append("path")
               .attr("class", "area")
               .datum(world)
               .attr("fill", 'url(#'+`${g1}`+')')
               //.attr("fill", "url(#g{g1})")
              //.attr("fill", "#D42424")
              .attr('d', area)
    
              svg1.append('text')
              .attr('text-anchor', 'start')
              .attr("dy", 20)
              .attr("dx", 60)
              .attr("font-size", 14)
              .text('Confirmed cases in the last 30 days')
    
              svg2.append('text')
              .attr('text-anchor', 'start')
              .attr("dy", 20)
              .attr("dx", 50)
              .attr("font-size", 14)
              .text('Deaths in the last 30 days')
    
              
              svg2.append("path")
              .attr("class", "area")
              .datum(DeathsData)
             .attr("fill", 'url(#'+`${g2}`+')')
             // .attr("fill", "#D42424")
             .attr('d', area2)
    
     
            svg1.select(".y")
           .remove()
        
            svg1.append("g")
             .attr("class", "y axis")
             .attr("transform", "translate(0, 0)")
             .call(y_axis);
    
             svg2.select(".y")
             .remove()
          
              svg2.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate(0, 0)")
               .call(y_axis2);
    
      }
   
}
