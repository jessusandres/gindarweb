import { Component, OnInit } from '@angular/core';
import {MAP_LAT, MAP_LNG} from '../../config/config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ]
})
export class ContactComponent implements OnInit {
  lat = MAP_LAT;
  lng = MAP_LNG;

  constructor() { }

  ngOnInit(): void {
  }

}
