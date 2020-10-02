import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {OrderInterface} from "../../interfaces/order.interface";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {OrderState} from "../../store/reducers/order.reducer";
import {ResetOrderAction} from "../../store/actions/order.actions";
import {WebRuc} from "../../types/types";

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styles: [
    'p {font-size: 15px}',
    'h6 {font-size: 18px}',
    'h6 span {font-weight: 300; font-size: 15px;}'
  ]
})
export class OrderConfirmComponent implements OnInit, OnDestroy {

  storeName: string;
  order: OrderInterface;
  orderSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.orderSubscription = this.store.select('orderState').subscribe((orderState: OrderState) => {
      this.order = orderState.order;

      if (this.order) {

        if (this.order.storeRuc === WebRuc.GINDAR) {
          this.storeName = 'GINDAR PERÚ';
        } else {
          this.storeName = 'ROGER FINQIN';
        }
      }

    });

  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetOrderAction());
    this.orderSubscription.unsubscribe();
  }

}
