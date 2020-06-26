import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
data ;
arr = [];
arr2 = [];
global;
countries;
  constructor(private appservice: AppserviceService) {}
  ngOnInit() {
    this.loadData();
    this.loadGlobal();
    
  }
loadData(){
  this.appservice.getData().subscribe(res =>{
    this.data = res;

    console.log('Result: ', this.data);
    for(let country of this.data)
    {
      this.arr.push(country);
    }
  })
  console.log(this.arr)
}
loadGlobal(){
  this.appservice.getGlobal().subscribe(res =>{
    this.global = res;
     this.countries = this.global.Countries;
     console.log(this.countries);
    console.log('Result: ', this.global);
   
  })

}
}
