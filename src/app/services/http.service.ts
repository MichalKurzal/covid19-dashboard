import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'https://disease.sh/v3/'
  Url2 = 'https://corona.lmao.ninja/v2/'

  headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')


  constructor(private http: HttpClient) { }

  WorldwideData() {
    return this.http
        .get(`${this.url}covid-19/all`, { headers: this.headers })
        .toPromise()
}

HistoricalData() {
    return this.http
        .get(`${this.url}covid-19/historical/all?lastdays=100`, {
            headers: this.headers,
        })
        .toPromise()
}

getCountriesData() {
    return this.http
        .get(`${this.Url2}countries?sort=country`, {
            headers: this.headers,
        })
        .toPromise()
}
HistoricalCountry(country) {
    return this.http
        .get(`${this.Url2}historical/${country}?lastdays=100`, {
            headers: this.headers,
        })
        .toPromise()
}
}
