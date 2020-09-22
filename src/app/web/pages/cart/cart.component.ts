import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {CartState} from '../../store/reducers/cart.reducer';
import {CartInterface} from '../../interfaces/cart_item.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit, OnDestroy {

  loading: boolean;
  actionLoading: boolean;
  total: number;
  cartAmount: number;
  gindarCartItems: CartInterface[];
  rogerCartItems: CartInterface[];
  otherCartItems: CartInterface[];

  cartSubscription: Subscription;
  text = 'producto';
  storeSelected: string;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.cartSubscription = this.store.select('cartState').subscribe((cartState: CartState) => {
      this.loading = cartState.loading;
      this.cartAmount = cartState.amount;
      this.gindarCartItems = cartState.gcart;
      this.rogerCartItems = cartState.rcart;
      this.otherCartItems = cartState.ocart;
      this.total = cartState.total;
      this.actionLoading = cartState.actionLoading;
      this.text = (this.cartAmount === 0 || this.cartAmount > 1) ? 'productos' : 'producto';
    });
  }


  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }


}
