import {Component, OnInit} from '@angular/core';

declare function inspiniaCommon(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    inspiniaCommon();
  }

}
