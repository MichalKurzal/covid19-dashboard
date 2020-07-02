import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  Url = 'https://api.covid19api.com'
 

  constructor(private http:HttpClient) { }

   getData(){
  
return this.http.get(`${this.Url}/countries?offset=0`)
  }
  getGlobal(){
    return this.http.get(`${this.Url}/summary?offset=0`)
      }
      getDayOne(country){
        return this.http.get(`${this.Url}/total/dayone/country/${country}/status/confirmed?offset=0`)
      }
      WorldTotal(){
        let date = new Date().toJSON();
        console.log('date ',date)
        return this.http.get(`${this.Url}/world?from=2020-06-01T00:00:00Z&to=${date}`)
      }
}
