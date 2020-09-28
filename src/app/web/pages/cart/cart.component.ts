import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {CartState} from '../../store/reducers/cart.reducer';
import {CartInterface} from '../../interfaces/cart_item.interface';
import {SetStoreCartAction} from '../../store/actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit, OnDestroy {

  loading: boolean;
  actionLoading: boolean;

  showOrderForm: boolean;

  cartSubscription: Subscription;
  orderSubscription: Subscription;
  orderLoading: boolean;
  orderMessage: string;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.cartSubscription = this.store.select('cartState').subscribe((cartState: CartState) => {

      this.loading = cartState.loading;
      this.actionLoading = cartState.actionLoading;
      this.showOrderForm = cartState.showCartForm;
    });

    this.orderSubscription = this.store.select('orderState').subscribe((orderState) => {
      this.orderLoading = orderState.loading;
      this.orderMessage = orderState.infoMessage;
    })
  }


  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }


}
