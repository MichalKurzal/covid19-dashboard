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
 console.log(this.cc);
 console.log(this.cn);
 return await this.cc;
  })
}
}
