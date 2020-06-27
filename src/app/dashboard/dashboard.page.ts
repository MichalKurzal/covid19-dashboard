import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
global : any;

data= [];
data2= []
  constructor(public appservice:AppserviceService, public nav: NavController, public router : Router) { }

  ngOnInit() {
this.loadGlobal();

let b1 = document.getElementById('c1');
b1.addEventListener('pointerdown', this.goforward);

  }
  loadGlobal = async()=>{
    this.appservice.getGlobal().subscribe(res =>{
      this.global = res;
      this.data2 = this.global.Global;
       this.data = Object.entries(this.global.Global);
       console.log(this.data);
       console.log(this.data2);
      console.log('Result: ', this.global);
     
    })
  
  }
  goforward = () =>{
    
      this.router.navigateByUrl('tabs-nav/graphs1');
  
    console.log('goforward');
  }
}
