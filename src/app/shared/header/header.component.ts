import {AfterViewInit, Component, OnInit} from '@angular/core';

declare function mdbMinPlugin(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    mdbMinPlugin();
  }

}
