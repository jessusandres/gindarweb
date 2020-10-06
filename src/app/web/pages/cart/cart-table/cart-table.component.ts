import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartInterface} from '../../../interfaces/cart_item.interface';
import {Subscription} from 'rxjs';
import {CartState} from '../../../store/reducers/cart.reducer';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {
  ApplyCouponAction,
  ApplyCouponFailureAction,
  RemoveCouponAction,
  RemoveCouponFailureAction,
  ShowCartForm
} from '../../../store/actions/cart.actions';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styles: [
    '.badge {font-size: .9rem;}',
    '.fa-trash {cursor: pointer}',
  ]
})
export class CartTableComponent implements OnInit, OnDestroy {


  total: number;
  cartAmount: number;
  gindarCartItems: CartInterface[];
  rogerCartItems: CartInterface[];
  otherCartItems: CartInterface[];
  coupons: string[] = [];
  couponError: string;
  couponMessage: string;

  cartSubscription: Subscription;
  text = 'producto';
  storeSelected: { name: string, ruc: string };

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.cartSubscription = this.store.select('cartState').subscribe((cartState: CartState) => {

      this.cartAmount = cartState.amount;
      this.gindarCartItems = cartState.gCart;
      this.rogerCartItems = cartState.rCart;
      this.otherCartItems = cartState.oCart;
      this.total = cartState.total;
      this.coupons = cartState.coupons;

      this.couponError = cartState.couponErrorMessage;
      this.couponMessage = cartState.couponMessage;

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

  deleteCupon(coupon: string): void {
    if (!coupon) {
      this.store.dispatch(new RemoveCouponFailureAction({message: 'No se proporcionó código de cupón'}));
      return;
    }
    this.store.dispatch(new RemoveCouponAction({coupon}));
  }

  applyCoupon(coupon: any): void {
    if (coupon.trim().length < 5) {
      this.store.dispatch(new ApplyCouponFailureAction({message: 'Código de cupón incorrecto'}));
      return;
    }

    this.store.dispatch(new ApplyCouponAction({coupon}));
  }
}
