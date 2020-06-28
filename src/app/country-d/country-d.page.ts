import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private route: ActivatedRoute) {
   
   }

  ngOnInit() {
 
 this.code();



  }
code =  () =>{
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
 console.log(this.cc);
 console.log(this.cn);
 return await this.cc;
  })
}
}
