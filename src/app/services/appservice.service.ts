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
        return this.http.get(`${this.Url}/dayone/country/${country}/status/confirmed?offset=0`)
      }
}
