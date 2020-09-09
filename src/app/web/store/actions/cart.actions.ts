import {Action} from '@ngrx/store';
import {CartItem} from '../../interfaces/cart_item.interface';
import {act} from '@ngrx/effects';
import {ItemModel} from '../../models/item.model';

export enum CartTypes {

  LOAD_CART = '[CART] LOAD CART',
  LOAD_CART_SUCCESS = '[CART] LOAD CART SUCCESS',
  LOAD_CART_FAILURE = '[CART] LOAD CART FAILURE',
  ADD_CART_ITEM = '[CART] ADD ITEM',
  ADD_CART_ITEM_SUCCESS = '[CART] ADD ITEM SUCCESS',
  ADD_CART_ITEM_FAILURE = '[CART] ADD ITEM FAILURE',
  UPDATE_CART_ITEM = '[CART] UPDATE ITEM',
  UPDATE_CART_ITEM_SUCESS = '[CART] UPDATE ITEM SUCCESS',
  UPDATE_CART_ITEM_FAILURE = '[CART] UPDATE ITEM FAILURE',
  DROP_CART_ITEM = '[CART] DROP ITEM',
  EMPTY_CART = '[CART] EMPTY CART',

}

export class LoadCartActionAction implements Action {
  readonly type = CartTypes.LOAD_CART;
}

export class LoadCartSuccessAction implements Action {
  readonly type = CartTypes.LOAD_CART_SUCCESS;

  constructor(public payload: { items: CartItem[], total: number }) {
  }
}

export class LoadCartFailureAction implements Action {
  readonly type = CartTypes.LOAD_CART_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class AddCartItemAction implements Action {
  readonly type = CartTypes.ADD_CART_ITEM;

  constructor(public payload: { item: ItemModel }) {
  }
}

export class AddCartItemSuccessAction implements Action {
  readonly type = CartTypes.ADD_CART_ITEM_SUCCESS;

  constructor(public payload: { message: string }) {
  }
}

export class AddCartItemFailureAction implements Action {
  readonly type = CartTypes.ADD_CART_ITEM_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class UpdateCartItemAction implements Action {
  readonly type = CartTypes.UPDATE_CART_ITEM;

  constructor(public payload: { item: ItemModel }) {
  }
}

export class UpdateCartItemSuccessAction implements Action {
  readonly type = CartTypes.UPDATE_CART_ITEM_SUCESS;

  constructor(public payload: { message: string }) {
  }
}

export class UpdateCartItemFailureAction implements Action {
  readonly type = CartTypes.UPDATE_CART_ITEM_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class DropCartItemAction implements Action {
  readonly type = CartTypes.DROP_CART_ITEM;

  constructor(public payload: { item: ItemModel }) {
  }
}

export class EmptyCartAction implements Action {
  readonly type = CartTypes.EMPTY_CART;
}

export type CartActions = LoadCartActionAction |
  LoadCartSuccessAction |
  LoadCartFailureAction |
  AddCartItemAction |
  AddCartItemSuccessAction |
  AddCartItemFailureAction |
  UpdateCartItemAction |
  UpdateCartItemSuccessAction |
  UpdateCartItemFailureAction |
  DropCartItemAction |
  EmptyCartAction;

