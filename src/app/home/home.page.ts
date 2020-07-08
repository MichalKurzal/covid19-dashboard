import { Component, OnInit,ViewChild } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { NavController , Platform, NavParams} from '@ionic/angular';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import {File} from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonInfiniteScroll } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
data ;
global;
gurl;
countries;

  constructor(private appservice: AppserviceService, public nav:NavController, 
     public platform:Platform, public fileTransfer :FileTransfer, private WebView : WebView,
    public navParams: NavParams, private route: ActivatedRoute, private router : Router,private file: File,
    private nativeStorage: NativeStorage) {}
  ngOnInit() {
  this.gurl =  this.WebView.convertFileSrc( this.file.dataDirectory);
  this.nativeStorage.getItem('DataCountries').then(res =>{
      this.countries = res;
      console.log('countries', this.countries);
    })
  }
 
goforward = (param)=>{
 let navigationExtras: NavigationExtras = {
    queryParams: {
        country: param
    }
};
console.log('Detail Country Page');
this.nav.navigateForward('tabs-nav/countryD', navigationExtras);
}
loadData(event){
  console.log(event)
  setTimeout(() => {
    console.log('Done');
    event.target.complete();
    // App logic to determine if all data is loaded
    // and disable the infinite scroll
  }, 500);
}
}

