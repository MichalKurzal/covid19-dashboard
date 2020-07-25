import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  Url = 'https://api.covid19api.com'
  Url2 = 'https://corona.lmao.ninja/v2/'
  url3 = 'https://restcountries.eu/rest/v2/all?fields=alpha2Code'

 

  constructor(private http:HttpClient, private NativeStorage :NativeStorage) { }

   getData(){
  return this.http.get(`${this.Url}/countries?offset=0`);
  }

  getGlobal(){
      return this.http.get(`${this.Url}/summary?offset=0`).toPromise()
  }
      getDayOne(country){
        return this.http.get(`${this.Url}/total/dayone/country/${country}/status/confirmed?offset=0`)
      }

      getDayOne2(country){
        return this.http.get(`${this.Url}/dayone/country/${country}/status/confirmed?offset=0`)
      }
      
      WorldTotal(){
        let date = new Date().toJSON();
        console.log('date ',date);
        return this.http.get(`${this.Url}/world?from=2020-06-01T00:00:00Z&to=${date}`).toPromise()
      }
      NewApiContinents(){
        return this.http.get(`${this.Url2}continents?false&sort`).toPromise();
      }
      HistoricalData(){
        return  this.http.get(`${this.Url2}historical/all`).toPromise();
      }
      getCountries(){
        return this.http.get(this.url3).toPromise();
      }
      HistoricalCountry(country){
      return this.http.get(`${this.Url2}historical/${country}?lastdays=30`).toPromise()
      }
}
