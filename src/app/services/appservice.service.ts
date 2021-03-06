import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class AppserviceService {
  Url2 = 'https://corona.lmao.ninja/v2/';
  url3 = 'https://restcountries.eu/rest/v2/all?fields=alpha2Code';

  constructor(private http: HttpClient) {}
  NewApiContinents() {
    return this.http.get(`${this.Url2}continents?false&sort`).toPromise();
  }

  HistoricalData() {
    return this.http.get(`${this.Url2}historical/all`).toPromise();
  }

  getCountries() {
    return this.http.get(this.url3).toPromise();
  }
  getCountriesData() {
    return this.http.get(`${this.Url2}countries?sort=country`).toPromise();
  }
  HistoricalCountry(country) {
    return this.http.get(`${this.Url2}historical/${country}?lastdays=30`).toPromise();
  }

  worldchart = (cases, deaths, svg1, svg2, id1, id2, g1, g2) => {
    let cases_ = [];
    let deaths_ = [];

    cases_ = Object.values(cases)
      .map((c, i) => [{ day: c, nr: i }])
      .map((c) => c[0]);
    deaths_ = Object.values(deaths)
      .map((c, i) => [{ day: c, nr: i }])
      .map((c) => c[0]);

    console.log('chart cases', cases_);
    console.log('chart deaths', deaths_);

    let width = window.innerWidth;
    if (width > 800) {
      width = 800;
    }
    const realheight = window.innerHeight;
    let ratio = realheight / width;
    if (ratio < 1.45) {
      ratio = 1.45;
    }
    const ratio2 = 4 - ratio;
    const height = width / ratio2;

    console.log(window.innerWidth);
    console.log('width ', width);
    console.log('height ', height);
    console.log('ratio ', ratio);

    const domain = cases_[cases_.length - 1].day + 0.1 * cases_[cases_.length - 1].day;
    const domain2 = deaths_[deaths_.length - 1].day + 0.1 * deaths_[deaths_.length - 1].day;

    const xScale = d3
      .scaleBand()
      .domain(cases_.map((dataPoint) => dataPoint.nr))
      .rangeRound([0, width + 15]);
    const yScale = d3.scaleLinear().domain([0, domain]).range([height, 0]);
    const xScale2 = d3
      .scaleBand()
      .domain(deaths_.map((dataPoint) => dataPoint.nr))
      .rangeRound([0, width + 15]);
    const yScale2 = d3.scaleLinear().domain([0, domain2]).range([height, 0]);

    const yaxis = d3.axisRight().scale(yScale);
    const yaxis2 = d3.axisRight().scale(yScale2);

    const curve = d3.curveLinear;
    const curve2 = d3.curveLinear;

    const area = d3
      .area()
      .curve(curve)
      .x((d) => xScale(d.nr))
      .y0(yScale(0))
      .y1((d) => yScale(d.day));

    const area2 = d3
      .area()
      .curve(curve2)
      .x((d) => xScale2(d.nr))
      .y0(yScale(0))
      .y1((d) => yScale2(d.day));

    svg1 = d3.select(`${id1}`).attr('viewBox', [0, 0, width, height]);
    svg2 = d3.select(`${id2}`).attr('viewBox', [0, 0, width, height]);
    svg1.attr('display', 'initial');
    svg2.attr('display', 'initial');

    const gradient = svg1
      .append('svg:defs')
      .append('svg:linearGradient')
      .attr('id', `${g1}`)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
      .attr('spreadMethod', 'pad');
    gradient
      .append('svg:stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3dc1f0')
      .attr('stop-opacity', 0.6);
    gradient
      .append('svg:stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2aa7d4')
      .attr('stop-opacity', 0.6);

    const gradient2 = svg2
      .append('svg:defs')
      .append('svg:linearGradient')
      .attr('id', `${g2}`)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
      .attr('spreadMethod', 'pad');
    gradient2
      .append('svg:stop')
      .attr('offset', '0%')
      .attr('stop-color', '#d6233c')
      .attr('stop-opacity', 0.8);
    gradient2
      .append('svg:stop')
      .attr('offset', '100%')
      .attr('stop-color', '#c71d3b')
      .attr('stop-opacity', 0.8);

    svg1.select('.area').remove();
    svg2.select('.area').remove();

    svg1
      .append('path')
      .attr('class', 'area')
      .datum(cases_)
      .attr('fill', 'url(#' + `${g1}` + ')')
      .attr('d', area);

    svg1
      .append('text')
      .attr('text-anchor', 'start')
      .attr('dy', 20)
      .attr('dx', 60)
      .attr('font-size', 16)
      .text('Confirmed cases in the last 30 days');

    svg2
      .append('text')
      .attr('text-anchor', 'start')
      .attr('dy', 20)
      .attr('dx', 50)
      .attr('font-size', 16)
      .text('Deaths in the last 30 days');

    svg2
      .append('path')
      .attr('class', 'area')
      .datum(deaths_)
      .attr('fill', 'url(#' + `${g2}` + ')')
      .attr('d', area2);

    svg1.select('.y').remove();

    svg1.append('g').attr('class', 'y axis').attr('transform', 'translate(0, 0)').call(yaxis);

    svg2.select('.y').remove();

    svg2.append('g').attr('class', 'y axis').attr('transform', 'translate(0, 0)').call(yaxis2);
  };
}
