import {AfterViewInit, Component, OnInit} from '@angular/core';

declare const Culqi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'gindarperu';

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    Culqi.publicKey = 'pk_test_9fb7c16dc0ed24f5';
  }

}
