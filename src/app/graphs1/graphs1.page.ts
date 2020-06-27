import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-graphs1',
  templateUrl: './graphs1.page.html',
  styleUrls: ['./graphs1.page.scss'],
})
export class Graphs1Page implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(d3);
  }

}
