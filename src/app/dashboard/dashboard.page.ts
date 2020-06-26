import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
global : any;

data= [];
data2= []
  constructor(public appservice:AppserviceService) { }

  ngOnInit() {
this.loadGlobal();
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
}
