import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService } from '../services/appservice.service';
import * as d3 from "d3";
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {File} from '@ionic-native/file/ngx';

@Component({
  selector: 'app-country-d',
  templateUrl: './country-d.page.html',
  styleUrls: ['./country-d.page.scss'],
})
export class CountryDPage implements OnInit {
cc : any;
cn :any;
ncon :any;
nd: any;
nr:any;
tc:any;
tr: any;
td:any;
slug: any;
dayone :any;
dayL : any;
dayoneAU :any;
gurl;
svg:any;
svg2:any;

  constructor(private route: ActivatedRoute, public appservice : AppserviceService, private WebView : WebView, private file: File) {
   
   }

  ngOnInit() {
    this.gurl =  this.WebView.convertFileSrc( this.file.dataDirectory);
    this.route.queryParams.subscribe(async params => {
      let c = params["country"];
       this.cc = c.CountryCode;
       this.cn = c.Country;
       this.ncon = c.NewConfirmed;
       this.nd = c.NewDeaths;
       this.nr = c.NewRecovered;
       this.tc = c.TotalConfirmed;
       this.td = c.TotalDeaths;
       this.tr = c.TotalRecovered;
       this.slug = c.Slug;
     
       console.log(this.cc);
       console.log(this.cn);
       this.getHistoricalData();
       return await c;
    })
  }

getHistoricalData = ()=>{
this.appservice.HistoricalCountry(this.cn).then(data=>{
  let timeline = data['timeline'];
  let cases = timeline['cases'];
  let deaths = timeline['deaths'];
  console.log('timeline cases', cases);
this.appservice.worldchart(cases,deaths,this.svg,this.svg2,'#svg1','#svg2','g1','g2')
})
}

}