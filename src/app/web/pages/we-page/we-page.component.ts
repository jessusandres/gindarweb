import {Component, OnInit} from '@angular/core';
import {MAP_LAT, MAP_LNG} from '../../config/config';


@Component({
  selector: 'app-we-page',
  templateUrl: './we-page.component.html',
  styles: []
})
export class WePageComponent implements OnInit {

  lat = MAP_LAT;
  lng = MAP_LNG;

  constructor() {
  }

  ngOnInit(): void {
  }

}
