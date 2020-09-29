import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {CartState} from '../../store/reducers/cart.reducer';
import {ResetOrderAction} from "../../store/actions/order.actions";
import {OrderInterface} from "../../interfaces/order.interface";

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

  order: OrderInterface;

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
      this.order = orderState.order;
    })
  }


  ngOnDestroy(): void {
    if (!this.order) {
      this.store.dispatch(new ResetOrderAction());
    }
    this.cartSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }


}
