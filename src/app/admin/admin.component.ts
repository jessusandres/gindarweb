import {Component, OnInit} from '@angular/core';

declare function inspiniaCommon(): any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: []
})
export class AdminComponent implements OnInit {

  // private linkTheme = document.querySelector('#adminHref');

  constructor() {
    // console.log('admin component');
  }

  ngOnInit(): void {
    inspiniaCommon();
    // const url = './assets/dadmin/css/style.css';
    // this.linkTheme.removeAttribute('href');
  }

}
