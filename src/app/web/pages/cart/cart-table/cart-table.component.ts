import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartInterface} from '../../../interfaces/cart_item.interface';
import {Subscription} from 'rxjs';
import {CartState} from '../../../store/reducers/cart.reducer';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {ShowCartForm} from '../../../store/actions/cart.actions';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styles: []
})
export class CartTableComponent implements OnInit, OnDestroy {


  total: number;
  cartAmount: number;
  gindarCartItems: CartInterface[];
  rogerCartItems: CartInterface[];
  otherCartItems: CartInterface[];

  cartSubscription: Subscription;
  text = 'producto';
  storeSelected: { name: string, ruc: string };

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.cartSubscription = this.store.select('cartState').subscribe((cartState: CartState) => {

      this.cartAmount = cartState.amount;
      this.gindarCartItems = cartState.gcart;
      this.rogerCartItems = cartState.rcart;
      this.otherCartItems = cartState.ocart;
      this.total = cartState.total;
      this.text = (this.cartAmount === 0 || this.cartAmount > 1) ? 'productos' : 'producto';

      this.storeSelected = cartState.storeSelected;

    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  showOrderForm(): void {
    this.store.dispatch(new ShowCartForm({show: true}));
  }
}
