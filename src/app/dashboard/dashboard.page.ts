import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as d3 from "d3";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
global : any;

data= [];
data2= [];

  constructor(public appservice:AppserviceService, public nav: NavController, public router : Router) { }

  ngOnInit() {
this.loadGlobal();
this.loadWorld()
let b1 = document.getElementById('c1');
b1.addEventListener('pointerdown', this.goforward);
let b2 = document.getElementById('c2');
b2.addEventListener('pointerdown', this.goforward2);

  }
  loadGlobal = async()=>{
    this.appservice.getGlobal().subscribe(res =>{
      this.global = res;
      this.data2 = this.global.Global;
  
       console.log('data2', this.data2);
  
     
    })
  
  }
  loadWorld = ()=>{
    this.appservice.WorldTotal().subscribe(res =>{
      console.log('worldTotal ', res)
      let data = [];
      let WorldL = [];
      let data2 = [];
      data = Object.entries(res);
     
      for (let d of data){
        data2.push(d[1].TotalConfirmed)
      }
      data2.sort((a,b)=> a-b);
      console.log('data2', data2)
     for (let d of data2){
 
     WorldL.push({day :d, nr: d.toString()});
 
     }
      
     let WL = WorldL.length;
      let world;
     world =WorldL.slice(WL-20);
     let domain = world[19].day + 0.4 * world[19].day;

    console.log('worldTotal[1] ',world);

     const xScale = d3.scaleBand().domain(world.map((dataPoint)=>dataPoint.nr)).rangeRound([0,350]).padding(0.1);
     const yScale = d3.scaleLinear().domain([0,domain]).range([350,0]);
   
     const y_axis = d3.axisRight().scale(yScale)
   
    
       var svg = d3.select('#svg3')
   .attr("viewBox", [0, 0, 350, 300])

       svg.append("g")
           .attr("fill", "#D42424")
         .selectAll("rect")
         .data(world)
         .join("rect")
          .attr("x", (world) => xScale(world.nr))
         .attr("y", world => yScale(world.day))
           .attr("height", (world) =>350 - yScale(world.day))
           .attr("width", xScale.bandwidth())
   
           svg.select(".y")
         .remove()
      
          svg.append("g")
           .attr("class", "y axis")
           .attr("transform", "translate(0, 0)")
           .call(y_axis);

           svg.append('text')
        .attr('text-anchor', 'start')
        .attr("dy", 30)
        .attr("dx", 20)
        .attr("font-size", 16)
        .text('Total Cases Worldwide in the last 20 days')


    })
  }
  goforward = () =>{
    
      this.router.navigateByUrl('tabs-nav/graphs1');
  
    console.log('goforward');
  }
  goforward2 = () =>{
    
    this.router.navigateByUrl('tabs-nav/graphs2');

  console.log('goforward');
}

}
