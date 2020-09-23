import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CartInterface} from '../../../interfaces/cart_item.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {Subscription} from 'rxjs';
import {SetStoreCartAction} from '../../../store/actions/cart.actions';

@Component({
  selector: 'app-store-cart',
  templateUrl: './store-cart.component.html',
  styles: [
    'app-cart-item {display: table-row; vertical-align: inherit;border-color: inherit;}'
  ]
})
export class StoreCartComponent implements OnInit, OnDestroy {
  @Input() storeName: string;
  @Input() storeRuc: string;

  @Input() items: CartInterface[];

  storeSelected: { name: string, ruc: string };
  cartSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.cartSubscription = this.store.select('cartState').subscribe((cartState) => {
      this.storeSelected = cartState.storeSelected;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  changeStore(): void {
    this.store.dispatch(new SetStoreCartAction({ruc: this.storeRuc, name: this.storeName}));
  }
}
