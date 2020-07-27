import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import {File} from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
global : any;
data;
TotalC;
TotalD;
TotalR;
NewC;
NewD;
NewR;
countries;
svg:any;
svg2:any;

  constructor(public appservice:AppserviceService,public fileTransfer :FileTransfer, 
    public nav: NavController,private file :File, public router : Router,private nativeStorage: NativeStorage, public loading: LoadingController) { }

  ngOnInit() {
Promise.all([this.loadGlobal(), this.loadContinents(),this.loadHistorical(),this.getCountrynames()]);
  }

  getCountrynames= async()=>{
    this.nativeStorage.getItem('CountryCodes').then(res =>{
      let data = res;
      this.checkImages(data); 
      })
 .catch(error=>{
      console.log('Error getCountrynames', error)
     this.appservice.getCountries().then(data=>{
    let result = [];
    let codes = [];
    
    for (let code in data){
      result.push(data[code])
    }
    codes = result.map(a=>a.alpha2Code);
    console.log('Codes', codes);
    
    this.nativeStorage.setItem('CountryCodes', codes).then(()=> console.log('stored CountryCodes'),
    error => console.error('Error stoting item', error)
    );
    this.checkImages(codes)
        })
    })
  }

  loadHistorical=()=>{
    this.appservice.HistoricalData().then(data =>{
   console.log('Historical ', data)
   let cases = data['cases'];
   let deaths = data['deaths'];
   console.log('cases' , cases);
   this.nativeStorage.setItem('DataWorld', data).then(()=> console.log('stored Item Data World'),
   error => console.error('Error stoting item', error)
   );
   this.appservice.worldchart(cases,deaths,this.svg,this.svg2,'#svg3','#svg4','g3','g4')
    }).catch(error=>{
      console.log('error ',error)
      this.getDataWorld();
    })
   }
   
  loadContinents = async()=>{
    this.appservice.NewApiContinents().then(res =>{
      let ContArray = []
      let TotalCases = [];
      let NewCases = [];
      let TotalDeaths = [];
      let NewDeaths = [];
      let TotalRecovered =[];
      let NewRecovered = []; 

    for (let cases in res)
    {
        ContArray.push(res[cases]);
    }
    console.log('contarray ', ContArray);
   
   TotalCases = ContArray.map(c=>c.cases);
   NewCases = ContArray.map(c=>c.todayCases);
   TotalDeaths = ContArray.map(c=>c.deaths);
   NewDeaths = ContArray.map(c=>c.todayDeaths);
   TotalRecovered = ContArray.map(c=>c.recovered);
   NewRecovered = ContArray.map(c=>c.todayRecovered);
  
    let SumCases = TotalCases.reduce((a,b) => a +b);
    let SumNewCases = NewCases.reduce((a,b) => a +b) 
    let SumDeaths = TotalDeaths.reduce((a,b) => a +b) 
    let SumNewDeaths = NewDeaths.reduce((a,b) => a +b) 
    let SumTotalRecoverde= TotalRecovered.reduce((a,b) => a +b) 
    let SumNewRecovered = NewRecovered.reduce((a,b) => a +b) 

console.log('Total Cases, New Cases, Total Deaths, New Deaths',SumCases, SumNewCases, SumDeaths, SumNewDeaths);

 let DataCont = [];
   DataCont['cases']=  SumCases;
DataCont['newCases']= SumNewCases;
DataCont['NewDeaths'] = SumNewDeaths;
DataCont['deaths']= SumDeaths,
DataCont['recovered'] =  SumTotalRecoverde,
DataCont['NewRecovered'] = SumNewRecovered,

this.setTotal(DataCont);
   this.nativeStorage.setItem('DataContinents', DataCont).then(()=> console.log('stored Item'),
       error => console.error('Error stoting item', error)
       );
    }).catch(error =>{
      console.log('catch error get Global',error);
      this.getDataCont();
    })
  }

  loadGlobal = async()=>{
return await   this.appservice.getGlobal().then(res =>{
      this.global = res;
      this.countries = this.global.Countries;
   
       this.nativeStorage.setItem('DataCountries', this.countries).then(()=> console.log('stored Item'),
       error => console.error('Error stoting item', error)
       );

    }).catch(error =>{
      console.log('error ',error)
    })
  }


  getDataCont = ()=>{
    this.nativeStorage.getItem('DataGlobal').then(res =>{
      let data = res;
      console.log('get Data',data);
this.setTotal(data);   
    })
  }

  getDataWorld=()=>{
    this.nativeStorage.getItem('DataWorld').then(res =>{
     let cases = res['cases'];
     let deaths = res['deaths'];
     this.appservice.worldchart(cases,deaths,this.svg,this.svg2,'#svg3','#svg4','g3','g4')
    }).catch(error =>{
      console.log('error ', error)
    })
  }

  setTotal=(data)=>{
    console.log(data);
    this.TotalC = data.cases;
      this.NewC = data.newCases;
      this.NewD = data.NewDeaths;
      this.TotalD = data.deaths;
      this.TotalR = data.recovered;
      this.NewR = data.NewRecovered;
  }
  
  checkImages=(data)=>{
    let  PACF = []
    for (let c of data)
    {
     PACF.push(this.file.checkFile(this.file.dataDirectory, c+ '.png'))
    }
   Promise.all(PACF).then(async res=>{
     console.log('Sucess' + res)
   }).catch(err =>{
     console.log('files not fund')
     let PA = []

      for (let c of data)
      {
        PA.push(this.fileTransfer.create().download(`https://www.countryflags.io/${c}/flat/64.png`, this.file.dataDirectory + `${c}` + '.png'))
      }
      Promise.all(PA).then(res =>{
        console.log('Promise-all', res)
      })
   })
  }


  goforward = () =>{
  this.router.navigateByUrl('tabs-nav/graphs1');
  
  console.log('goforward');
  }

  goforward2 = () =>{
  this.router.navigateByUrl('tabs-nav/graphs2');

  console.log('goforward');
}


doRefresh(event) {
  Promise.all([this.loadHistorical(),this.loadGlobal(),this.loadContinents(),this.getCountrynames()]).then(()=> event.target.complete())
}
}