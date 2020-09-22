import {Component, Input, OnInit} from '@angular/core';
import {CartInterface} from '../../../interfaces/cart_item.interface';

@Component({
  selector: 'app-store-cart',
  templateUrl: './store-cart.component.html',
  styles: [
    'app-cart-item {display: table-row; vertical-align: inherit;border-color: inherit;}'
  ]
})
export class StoreCartComponent implements OnInit {
  @Input() storeName: string;
  @Input() items: CartInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
