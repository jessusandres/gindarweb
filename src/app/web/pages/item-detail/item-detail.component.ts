import {Component, OnInit} from '@angular/core';


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
    this.currentYear = new Date().getFullYear();
  }

}
