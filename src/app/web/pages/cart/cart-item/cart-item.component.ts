import {Component, Input, OnInit} from '@angular/core';
import {CartInterface} from '../../../interfaces/cart_item.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {DropCartItemAction, UpdateCartItemAction} from '../../../store/actions/cart.actions';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styles: ['input {width: 40%}']
})
export class CartItemComponent implements OnInit {
  @Input() cart: CartInterface;
  newAmount: number;

  swalOptions: any;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.newAmount = this.cart.amount;
    this.swalOptions = {
      title: '¿Está Seguro?',
      text: `${this.cart.detail.description} será removido de su carrito`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, regresar'
    };
  }


  updateItem(): void {
    if (isNaN(this.newAmount) || this.newAmount < 0) {
      this.newAmount = this.cart.amount;
      return;
    }
    this.store.dispatch(new UpdateCartItemAction({item: this.cart.detail, amount: this.newAmount}));
  }

  removeItem(): void {
    this.store.dispatch(new DropCartItemAction({item: this.cart}));
  }
}
