import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styles: []
})
export class PromotionsComponent implements OnInit {
  promotions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {
  }

  ngOnInit(): void {
  }

}
