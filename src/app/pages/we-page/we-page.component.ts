import {Component, OnInit} from '@angular/core';

declare function WOW(): any;

@Component({
  selector: 'app-we-page',
  templateUrl: './we-page.component.html',
  styles: []
})
export class WePageComponent implements OnInit {

  lat = -6.7705459;
  lng = -79.8395662;

  constructor() {
  }

  ngOnInit(): void {
    WOW().init();
  }

}
