import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-dash',
  templateUrl: './detail-dash.component.html',
  styleUrls: ['./detail-dash.component.scss'],
})
export class DetailDashComponent implements OnInit {
  @Input() totalCases;
  @Input() totalDeaths;
  @Input() totalRecovered;
  @Input() newCases;
  @Input() newDeaths;
  @Input() newRecovered;

  constructor(public router: Router) {}

  ngOnInit() {}
  goforward = () => {
    this.router.navigateByUrl('tabs-nav/graphs1');

    console.log('goforward');
  };

  goforward2 = () => {
    this.router.navigateByUrl('tabs-nav/graphs2');

    console.log('goforward');
  };
}
