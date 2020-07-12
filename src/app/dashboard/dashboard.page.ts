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
Promise.all([this.loadGlobal(), this.loadContinents(),this.loadHistorical()]);
  }
  loadContinents = async()=>{
    this.appservice.NewApiContinents().then(res =>{
      let ContArray = []
      let TotalCases = [];
      let NewCases = [];
      let TotalDeaths = [];
      let NewDeaths = [];
      let TotalRecovered =[];
      let NewRecovered = []; 

    for (let cases in res)
    {
        ContArray.push(res[cases]);
    }
    console.log('contarray ', ContArray);
    for (let Cont of ContArray)
    {
      TotalCases.push(Cont.cases)
    }
    for (let Cont of ContArray){
      NewCases.push(Cont.todayCases);
    }
    for (let Cont of ContArray){
      TotalDeaths.push(Cont.deaths);
    }
    for (let Cont of ContArray){
      NewDeaths.push(Cont.todayDeaths);
    }
    for (let Cont of ContArray){
    TotalRecovered.push(Cont.recovered)
    }
    for (let Cont of ContArray){
      NewRecovered.push(Cont.todayRecovered)
    }
    let SumCases = TotalCases.reduce(function (a,b) {
      return a +b;
    },0);

    let SumNewCases = NewCases.reduce(function(a,b){
      return a +b;
    },0) 

    let SumDeaths = TotalDeaths.reduce(function(a,b){
      return a +b;
    },0) 

    let SumNewDeaths = NewDeaths.reduce(function(a,b){
      return a +b;
    },0) 

    let SumTotalRecoverde= TotalRecovered.reduce(function(a,b){
      return a +b;
    },0) 

    let SumNewRecovered = NewRecovered.reduce(function(a,b){
      return a +b;
    },0) 



    console.log('Total Cases',SumCases);
    console.log('New Cases',SumNewCases);
    console.log('Total Deaths',SumDeaths);
    console.log('New Deaths',SumNewDeaths);

 let DataCont = [];
   DataCont['cases']=  SumCases;
DataCont['newCases']= SumNewCases;
DataCont['NewDeaths'] = SumNewDeaths;
DataCont['deaths']= SumDeaths,
DataCont['recovered'] =  SumTotalRecoverde,
DataCont['NewRecovered'] = SumNewRecovered,

this.setTotal(DataCont);
   this.nativeStorage.setItem('DataContinents', DataCont).then(()=> console.log('stored Item'),
       error => console.error('Error stoting item', error)
       );
    }).catch(error =>{
      console.log('catch error get Global');
      this.getDataCont();
    })
  
  }
  loadGlobal = async()=>{
return await   this.appservice.getGlobal().then(res =>{
      this.global = res;
    
      this.countries = this.global.Countries;
   
      this.checkImages(this.countries);
 

       
       this.nativeStorage.setItem('DataCountries', this.countries).then(()=> console.log('stored Item'),
       error => console.error('Error stoting item', error)
       );
       

    }).catch(error =>{
      console.log('catch error get Global');
      this.getData();
    })
  
  }
  getData = ()=>{
  
    this.nativeStorage.getItem('DataCountries').then(res =>{
      let data = res;
      this.checkImages(data);
      
      console.log('get Data',data);
    })
  }
  getDataCont = ()=>{
    this.nativeStorage.getItem('DataGlobal').then(res =>{
      let data = res;
      console.log('get Data',data);
this.setTotal(data);   
    })
  }
  setTotal=(data)=>{
    console.log(data);
    this.TotalC = data.cases;
      this.NewC = data.newCases;
      this.NewD = data.NewDeaths;
      this.TotalD = data.deaths;
      this.TotalR = data.recovered;
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

  getWorld=()=>{
    this.nativeStorage.getItem('DataWorld').then(res =>{
      let dataW = res;
     this.worldchart(dataW);
      
      console.log('get Data World',dataW);
    }).catch(error =>{
      console.log('error ', error)
    })
  }
 
loadHistorical=()=>{
 this.appservice.HistoricalData().then(data =>{
console.log('Historical ', data)
let result = Object.values(data)
this.nativeStorage.setItem('DataWorld', result).then(()=> console.log('stored Item Data World'),
error => console.error('Error stoting item', error)
);
this.worldchart(result)
 }).catch(error=>{
   console.log('error ',error)
   this.getWorld();
 })
}

  worldchart =(data)=>{
    console.log('worldchart', data)
    let WorldCon = [];
    let TotalCon = [];
    let WorldDeaths = [];
    let TotalDeaths = [];

   TotalCon = data[0];
   for (let d in TotalCon)
   {
     WorldCon.push({day:TotalCon[d],nr:TotalCon[d].toString()})
   }

console.log('chart cases',WorldCon)
  
  TotalDeaths = data[1];
  
   for (let td in TotalDeaths)
   {
    WorldDeaths.push({day :TotalDeaths[td],nr:TotalDeaths[td].toString()})
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
          .text('Confirmed cases worldwide in the last 30 days')

          this.svg2.append('text')
          .attr('text-anchor', 'start')
          .attr("dy", 20)
          .attr("dx", 50)
          .attr("font-size", 14)
          .text('Deaths worldwide in the last 30 days')

          
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

  Promise.all([this.loadGlobal(),this.loadContinents()]).then(()=> event.target.complete())
}
}

