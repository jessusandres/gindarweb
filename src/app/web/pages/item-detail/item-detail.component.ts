import {Component, OnInit} from '@angular/core';

declare function detailPluging(): any;

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styles: []
})
export class ItemDetailComponent implements OnInit {
  currentYear: any;

  constructor() {
  }

  ngOnInit(): void {
    detailPluging();
    this.currentYear = new Date().getFullYear();
  }

}
