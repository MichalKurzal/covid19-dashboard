import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService } from '../services/appservice.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import * as d3 from 'd3';

@Component({
  selector: 'app-country-d',
  templateUrl: './country-d.page.html',
  styleUrls: ['./country-d.page.scss'],
})
export class CountryDPage implements OnInit {
  ccode: any;
  country: any;
  ncon: any;
  nd: any;
  nr: any;
  tc: any;
  tr: any;
  td: any;
  gurl;
  svg: any;
  svg2: any;

  constructor(
    private route: ActivatedRoute,
    public appservice: AppserviceService,
    private webView: WebView,
    private file: File
  ) {}

  ngOnInit() {
    this.gurl = this.webView.convertFileSrc(this.file.dataDirectory);
    this.route.queryParams.subscribe(async (params) => {
      const c = params.country;
      console.log(c);
      this.ccode = c.countryInfo.iso2;
      this.country = c.country;
      this.ncon = c.todayCases;
      this.nd = c.todayDeaths;
      this.nr = c.todayRecovered;
      this.tc = c.cases;
      this.td = c.deaths;
      this.tr = c.recovered;
      this.getHistoricalData();
      return await c;
    });
  }

  getHistoricalData = () => {
    this.appservice
      .HistoricalCountry(this.ccode)
      .then((data: any) => {
        console.log('HistorcalData', data);
        const timeline = data.timeline;
        const cases = timeline.cases;
        const deaths = timeline.deaths;
        this.appservice.worldchart(
          cases,
          deaths,
          this.svg,
          this.svg2,
          '#svg1',
          '#svg2',
          'g1',
          'g2'
        );
      })
      .catch((error) => {
        console.log('Cannot get Data for this Country - Error', error);

        this.svg = d3.select('#svg1').attr('viewBox', [0, 0, 0, 0]);
        this.svg2 = d3.select('#svg2').attr('viewBox', [0, 0, 0, 0]);
        this.svg.attr('display', 'none');
        this.svg2.attr('display', 'none');
      });
  };
}
