import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import * as d3 from "d3";
import {File} from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
global : any;
data;
data2;
TotalC;
TotalD;
TotalR;
NewC;
NewD;
NewR;
countries;
svg:any;
svg2:any;

  constructor(public appservice:AppserviceService,public fileTransfer :FileTransfer, 
    public nav: NavController,private file :File, public router : Router,private nativeStorage: NativeStorage, public loading: LoadingController) { }

  ngOnInit() {
Promise.all([this.loadWorld(),this.loadGlobal()]);
  }
  loadGlobal = async()=>{
return await   this.appservice.getGlobal().then(res =>{
      this.global = res;
      this.data2 = this.global.Global;
      this.countries = this.global.Countries;
      this.setTotal(this.data2);
      this.checkImages(this.countries);
      console.log('data2', this.data2);

       this.nativeStorage.setItem('DataGlobal', this.data2).then(()=> console.log('stored Item'),
       error => console.error('Error stoting item', error)
       );
       this.nativeStorage.setItem('DataCountries', this.countries).then(()=> console.log('stored Item'),
       error => console.error('Error stoting item', error)
       );
       

    }).catch(error =>{
      console.log('catch error get Global');
      this.getData();
    })
  
  }
  getData = ()=>{
    this.nativeStorage.getItem('DataGlobal').then(res =>{
      let data = res;
      this.setTotal(data);
      
      console.log('get Data',data);
    })
    this.nativeStorage.getItem('DataCountries').then(res =>{
      let data = res;
      this.checkImages(data);
      
      console.log('get Data',data);
    })
  }
  setTotal=(data)=>{
    this.TotalC = data.TotalConfirmed;
    this.TotalD = data.TotalDeaths;
    this.TotalR = data.TotalRecovered;
    this.NewC = data.NewConfirmed;
    this.NewD = data.NewDeaths;
    this.NewR = data.NewRecovered;
  }
  checkImages=(data)=>{
    let  PACF = []
    for (let c of data)
    {
     PACF.push(this.file.checkFile(this.file.dataDirectory, c.CountryCode+ '.png'))
    }
   Promise.all(PACF).then(async res=>{
     console.log('Sucess' + res)
   }).catch(err =>{
     console.log('files not fund')
     let PA = []

     console.log(this.countries.length)
      for (let c of this.countries)
      {
        PA.push(this.fileTransfer.create().download(`https://www.countryflags.io/${c.CountryCode}/flat/64.png`, this.file.dataDirectory + `${c.CountryCode}` + '.png'))
      }
      Promise.all(PA).then(res =>{
        console.log('Promise-all', res)
       
      })
   })
  }

  loadWorld = async()=>{
 return await   this.appservice.WorldTotal().then(res =>{
      this.data = [];
      this.data = Object.entries(res);
      this.nativeStorage.setItem('DataWorld', this.data).then(()=> console.log('stored Item Data World'),
      error => console.error('Error stoting item', error)
      );
      this.worldchart(this.data);
    }).catch(error =>{
      console.log('Catch error LoadWorld');
      this.getWorld();
    })
  }

  getWorld=()=>{
    this.nativeStorage.getItem('DataWorld').then(res =>{
      let dataW = res;
      this.worldchart(dataW);
      
      console.log('get Data World',dataW);
    }).catch(error =>{
      console.log('error ', error)
    })
  }

  reload = async()=>{
    console.log('reload');
    let load=  await this.loading.create({
      message : 'Reloading the Page...',
      duration: 2000,
    });
    load.present();
    location.reload();
  
   
  }
 
  worldchart =(data)=>{
    let WorldCon = [];
    let TotalCon = [];
    let WorldDeaths = [];
    let TotalDeaths = [];


    for (let d of data){
      TotalCon.push(d[1].TotalConfirmed)
    }
    TotalCon.sort((a,b)=> a-b);

   for (let d of TotalCon){

   WorldCon.push({day :d, nr: d.toString()});

   }

   for(let d2 of data){
     TotalDeaths.push(d2[1].TotalDeaths)
   }
   TotalDeaths.sort((a,b)=> a-b);

   for (let d2 of TotalDeaths){
   WorldDeaths.push({day :d2, nr: d2.toString()});
    }
    
   let WL = WorldCon.length;
   let world;
   world =WorldCon.slice(WL-20);

   let DL = WorldDeaths.length;
   let DeathsData;
   DeathsData = WorldDeaths.slice(DL-20);
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
let height = width/2;
console.log('width ',width);
console.log('height ', height)

   let domain = world[19].day + 0.1 * world[19].day;
   let domain2 = DeathsData[DeathsData.length-1].day + 0.1*DeathsData[DeathsData.length-1].day

  console.log('Final Data World ',world);

   const xScale = d3.scaleBand().domain(world.map((dataPoint)=>dataPoint.nr)).rangeRound([0,width]);
   const yScale = d3.scaleLinear().domain([0,domain]).range([height,0]);
   const xScale2 = d3.scaleBand().domain(DeathsData.map((dataPoint)=>dataPoint.nr)).rangeRound([0,width]);
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
  
     this.svg = d3.select('#svg3')
 .attr("viewBox", [0, 0, width, height])

 this.svg2 = d3.select('#svg4')
 .attr("viewBox", [0, 0, width, height])

  
         var gradient = this.svg.append("svg:defs")
         .append("svg:linearGradient")
           .attr("id", "gradient2")
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
           .attr("class", "area")
           .datum(world)
           .attr("fill", "url(#gradient2)")
          //.attr("fill", "#D42424")
          .attr('d', area)

          this.svg.append('text')
          .attr('text-anchor', 'start')
          .attr("dy", 20)
          .attr("dx", 60)
          .attr("font-size", 14)
          .text('Confirmed cases worldwide in the last 20 days')

          this.svg2.append('text')
          .attr('text-anchor', 'start')
          .attr("dy", 20)
          .attr("dx", 50)
          .attr("font-size", 14)
          .text('Deaths worldwide in the last 20 days')

          
          this.svg2.append("path")
          .attr("class", "area")
          .datum(DeathsData)
         // .attr("fill", "url(#gradient2)")
          .attr("fill", "#D42424")
         .attr('d', area2)
  
 
         this.svg.select(".y")
       .remove()
    
        this.svg.append("g")
         .attr("class", "y axis")
         .attr("transform", "translate(0, 0)")
         .call(y_axis);

         this.svg2.select(".y")
         .remove()
      
          this.svg2.append("g")
           .attr("class", "y axis")
           .attr("transform", "translate(0, 0)")
           .call(y_axis2);
  

      

  }
  goforward = () =>{
    
      this.router.navigateByUrl('tabs-nav/graphs1');
  
    console.log('goforward');
  }
  goforward2 = () =>{
    
    this.router.navigateByUrl('tabs-nav/graphs2');

  console.log('goforward');
}


doRefresh(event) {
  this.svg.selectAll(".area")
  .remove()

  Promise.all([this.loadWorld(),this.loadGlobal()]).then(()=> event.target.complete())
}
}

