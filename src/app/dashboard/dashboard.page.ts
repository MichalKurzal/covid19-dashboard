import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import {File} from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { async } from 'rxjs';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
global: any;
data;
TotalC;
TotalD;
TotalR;
NewC;
NewD;
NewR;
countries;
svg: any;
svg2: any;

  constructor(public appservice: AppserviceService, public fileTransfer: FileTransfer,
              public nav: NavController, private file: File, public router: Router,
              private nativeStorage: NativeStorage, public loading: LoadingController) { }

ngOnInit()
 {
    Promise.all([this.loadContinents(), this.loadHistorical()]);
  }
async ngAfterViewInit()
 {
    console.log('ngAfterViewInit');
    const loading = this.loading.create({
    spinner: 'circles',
    message: 'Loading Please Wait...'
   });
    (await loading).present().then(async () => {
   Promise.all([this.loadGlobal(), this.getCountrynames(), this.loadCountriesData()])
   .then(async () => (await loading).dismiss());
   });
 }
  getCountrynames = async () => 
  {
     return await this.nativeStorage.getItem('CountryCodes').then(res => {
      const data = res;
      this.checkImages(data);
  })
 .catch(err => 
  {
      console.log('Error getCountrynames', err);
      this.appservice.getCountries().then(data => {
      const result = [];
      let codes = [];
      for (const code in data){
      result.push(data[code]);
      }
      codes = result.map(a => a.alpha2Code);
      console.log('Codes', codes);
      this.nativeStorage.setItem('CountryCodes', codes).then(() => console.log('stored CountryCodes'),
      err => console.error('Error stoting item', err)
    );
    this.checkImages(codes);
     });
  });
  }

  loadHistorical = async () => {
    return await this.appservice.HistoricalData().then((data: any) => {
   console.log('Historical ', data);
   const cases = data.cases;
   const deaths = data.deaths;
   console.log('cases' , cases);
   this.nativeStorage.setItem('DataWorld', data).then(() => console.log('stored Item Data World'),
   error => console.error('Error stoting item', error)
   );
   this.appservice.worldchart(cases, deaths, this.svg, this.svg2, '#svg3', '#svg4', 'g3', 'g4');
    }).catch(error => {
      console.log('error ', error);
      this.getDataWorld();
    });
   }

  loadContinents = async () => {
    return  await this.appservice.NewApiContinents().then(res => {
      const ContArray = [];
      let TotalCases = [];
      let NewCases = [];
      let TotalDeaths = [];
      let NewDeaths = [];
      let TotalRecovered = [];
      let NewRecovered = [];

      for (const cases in res)
    {
        ContArray.push(res[cases]);
    }
      console.log('contarray ', ContArray);

      TotalCases = ContArray.map(c => c.cases);
      NewCases = ContArray.map(c => c.todayCases);
      TotalDeaths = ContArray.map(c => c.deaths);
      NewDeaths = ContArray.map(c => c.todayDeaths);
      TotalRecovered = ContArray.map(c => c.recovered);
      NewRecovered = ContArray.map(c => c.todayRecovered);

      const SumCases = TotalCases.reduce((a, b) => a + b);
      const SumNewCases = NewCases.reduce((a, b) => a + b);
      const SumDeaths = TotalDeaths.reduce((a, b) => a + b);
      const SumNewDeaths = NewDeaths.reduce((a, b) => a + b);
      const SumTotalRecoverde = TotalRecovered.reduce((a, b) => a + b);
      const SumNewRecovered = NewRecovered.reduce((a, b) => a + b);

      console.log('Total Cases, New Cases, Total Deaths, New Deaths', SumCases, SumNewCases, SumDeaths, SumNewDeaths);

      const DataCont = {cases : 0, newCases: 0, NewDeaths : 0, deaths : 0, recovered : 0, NewRecovered : 0};
      DataCont.cases =  SumCases;
      DataCont.newCases = SumNewCases;
      DataCont.NewDeaths = SumNewDeaths;
      DataCont.deaths = SumDeaths,
DataCont.recovered =  SumTotalRecoverde,
DataCont.NewRecovered = SumNewRecovered,

this.setTotal(DataCont);
      this.nativeStorage.setItem('DataContinents', DataCont).then(() => console.log('stored Item'),
       err => console.error('Error stoting item', err)
       );
    }).catch(error => {
      console.log('catch error get Global', error);
      this.getDataCont();
    });
  }


  loadGlobal = async  () => {
 return await this.appservice.getGlobal().then(res => {
      this.global = res;
      this.countries = this.global.Countries;
      console.log('load global');
      this.nativeStorage.setItem('DataCountries2', this.countries).then(() => console.log('stored Item'),
       error => console.error('Error stoting item', error)
       );
    }).catch(error => {
      console.log('error ', error);
    });
}
loadCountriesData = async () => {
 return await this.appservice.getCountriesData().then(res => {
    console.log('Countries data', res);
    this.nativeStorage.setItem('DataCountries', res).then(() => console.log('stored Item'),
    error => console.error('Error stoting item', error)
    ).catch(error => {
      console.log('error', error);
    });
  });
}

  getDataCont = () => {
    this.nativeStorage.getItem('DataGlobal').then(res => {
      const data = res;
      console.log('get Data', data);
      this.setTotal(data);
    }).catch(error => {
      console.log('error', error);
    });
  }

  getDataWorld = () => {
    this.nativeStorage.getItem('DataWorld').then(res => {
     const cases = res.cases;
     const deaths = res.deaths;
     this.appservice.worldchart(cases, deaths, this.svg, this.svg2, '#svg3', '#svg4', 'g3', 'g4');
    }).catch(error => {
      console.log('error ', error);
    });
  }

  setTotal = (data) => {
    console.log(data);
    this.TotalC = data.cases;
    this.NewC = data.newCases;
    this.NewD = data.NewDeaths;
    this.TotalD = data.deaths;
    this.TotalR = data.recovered;
    this.NewR = data.NewRecovered;
  }

  checkImages = (data) => {
    const  PACF = [];
    for (const c of data)
    {
     PACF.push(this.file.checkFile(this.file.dataDirectory, c + '.png'));
    }
    Promise.all(PACF).then(async res => {
     console.log('Sucess' + res);
   }).catch(err => {
     console.log('files not fund', err);
     const PA = [];

     for (const c of data)
      {
        PA.push(this.fileTransfer.create().download(`https://www.countryflags.io/${c}/shiny/64.png`, this.file.dataDirectory + `${c}` + '.png'));
      }
     Promise.all(PA).then(res => {
        console.log('Promise-all', res);
      });
   });
  }

  goforward = () => {
  this.router.navigateByUrl('tabs-nav/graphs1');

  console.log('goforward');
  }

  goforward2 = () => {
  this.router.navigateByUrl('tabs-nav/graphs2');

  console.log('goforward');
}

doRefresh(event) {
  Promise.all([this.loadHistorical(), this.loadGlobal(), this.loadCountriesData(), this.loadContinents(), this.getCountrynames()])
  .then(() => event.target.complete());
}
}
