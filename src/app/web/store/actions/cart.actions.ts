import {Action} from '@ngrx/store';
import {CartInterface} from '../../interfaces/cart_item.interface';
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
  DROP_CART_ITEM_SUCCESS = '[CART] DROP ITEM SUCCESS',
  DROP_CART_ITEM_FAILURE = '[CART] DROP ITEM FAILURE',
  EMPTY_CART = '[CART] EMPTY CART',
  CART_SET_STORE = '[CART] SET STORE CART',
  ADD_LOCAL_ITEM = '[CART] ADD LOCAL ITEM',
  ADD_LOCAL_ITEM_SUCCESS = '[CART] ADD LOCAL ITEM SUCCESS',
  SYNC_LOCAL_CART = '[CART] SYNC LOCAL CART',
  SYNC_AWAIT = '[CART] SYNC AWAIT',
  CART_SHOW_FORM = '[CART] SHOW CART FORM',
  CART_TOGGLE_VOUCHER = '[CART] TOGGLE CART VOUCHER',
  CART_TOGGLE_ONLINE_PAYMENT = '[CART] TOGGLE CART ONLINE PAYMENT',
}

export class LoadCartAction implements Action {
  readonly type = CartTypes.LOAD_CART;

}

export class LoadCartSuccessAction implements Action {
  readonly type = CartTypes.LOAD_CART_SUCCESS;

  constructor(public payload: {
    gcart: CartInterface[],
    rcart: CartInterface[],
    ocart: CartInterface[],
    amount: number, total: number
  }) {
  }
}

export class LoadCartFailureAction implements Action {
  readonly type = CartTypes.LOAD_CART_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class AddLocalItemAction implements Action {
  readonly type = CartTypes.ADD_LOCAL_ITEM;

  constructor(public payload: { item: ItemModel, amount: number }) {
  }
}

export class AddLocalItemSuccessAction implements Action {
  readonly type = CartTypes.ADD_LOCAL_ITEM_SUCCESS;

  constructor(public payload: { message: string }) {
  }
}

export class AddCartItemAction implements Action {
  readonly type = CartTypes.ADD_CART_ITEM;

  constructor(public payload: { item: ItemModel, amount: number }) {
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

  constructor(public payload: { item: ItemModel, amount: number }) {
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

  constructor(public payload: { item: CartInterface }) {
  }
}

export class DropCartItemSuccessAction implements Action {
  readonly type = CartTypes.DROP_CART_ITEM_SUCCESS;

  constructor(public payload: { message: string }) {
  }
}

export class DropCartItemFailureAction implements Action {
  readonly type = CartTypes.DROP_CART_ITEM_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class EmptyCartAction implements Action {
  readonly type = CartTypes.EMPTY_CART;
}

export class SetStoreCartAction implements Action {
  readonly type = CartTypes.CART_SET_STORE;

  constructor(public payload: { name: string, ruc: string }) {
  }

}

export class SyncLocalCartAction implements Action {
  readonly type = CartTypes.SYNC_LOCAL_CART;
}

export class SyncAwaitAction implements Action {
  readonly type = CartTypes.SYNC_AWAIT;
}

export class ShowCartForm implements Action {
  readonly type = CartTypes.CART_SHOW_FORM;

  constructor(public payload: { show: boolean }) {
  }
}

export class ToggleVoucherAction implements Action {
  readonly type = CartTypes.CART_TOGGLE_VOUCHER;

  constructor(public payload: { status: boolean }) {
  }
}

export class ToggleOnlinePaymentAction implements Action {
  readonly type = CartTypes.CART_TOGGLE_ONLINE_PAYMENT;

  constructor(public payload: { status: boolean }) {
  }
}

export type CartActions = LoadCartAction |
  LoadCartSuccessAction |
  LoadCartFailureAction |
  AddLocalItemAction |
  AddLocalItemSuccessAction |
  AddCartItemAction |
  AddCartItemSuccessAction |
  AddCartItemFailureAction |
  UpdateCartItemAction |
  UpdateCartItemSuccessAction |
  UpdateCartItemFailureAction |
  DropCartItemAction |
  DropCartItemSuccessAction |
  DropCartItemFailureAction |
  EmptyCartAction |
  SetStoreCartAction |
  SyncLocalCartAction |
  SyncAwaitAction |
  ShowCartForm |
  ToggleVoucherAction |
  ToggleOnlinePaymentAction;

