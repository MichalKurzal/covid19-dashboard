import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { NavController , Platform} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import {File} from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

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
gurl;

countries;
  constructor(private appservice: AppserviceService, public nav:NavController, private file :File, public platform:Platform, public fileTransfer :FileTransfer, private WebView : WebView) {}
  ngOnInit() {
  this.gurl =  this.WebView.convertFileSrc( this.file.dataDirectory);
    this.appservice.getGlobal().subscribe(res =>{
      this.global = res;
      this.countries = this.global.Countries;
      console.log(this.countries);
     console.log('Result: ', this.global);
     let  PACF = []
     for (let c of this.countries)
     {
      PACF.push(this.file.checkFile(this.file.dataDirectory, c.CountryCode+ '.png'))
     }
    Promise.all(PACF).then(async res=>{
      console.log('Sucess' + res)
    }).catch(err =>{
      console.log('files not fund')
      let PA = []
      let url = "https://www.countryflags.io/{{c.CountryCode}}/flat/64.png"
      console.log(this.countries.length)
       for (let c of this.countries)
       {
         PA.push(this.fileTransfer.create().download(`https://www.countryflags.io/${c.CountryCode}/flat/64.png`, this.file.dataDirectory + `${c.CountryCode}` + '.png'))
       }
       Promise.all(PA).then(res =>{
         console.log('Promise-all', res)
       })

    })
     
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
