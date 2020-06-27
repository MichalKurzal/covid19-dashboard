import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

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
  constructor(private appservice: AppserviceService, public nav:NavController) {}
  ngOnInit() {
  
    this.loadGlobal();

  }
loadGlobal(){
  this.appservice.getGlobal().subscribe(res =>{
    this.global = res;
     this.countries = this.global.Countries;
     console.log(this.countries);
    console.log('Result: ', this.global);
   
  })

}
goforward = (param)=>{
  let ele = document.getElementById('it');

 let navigationExtras: NavigationExtras = {
    queryParams: {
        country: param
    }
    
};
console.log('it');
this.nav.navigateForward('tabs-nav/countryD', navigationExtras);
}
}
