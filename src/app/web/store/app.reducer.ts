import {AuthReducer, AuthState} from './reducers/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {UiReducer, UiState} from './reducers/ui.reducer';
import {CartReducer, CartState} from './reducers/cart.reducer';
import {ShowcaseReducer, ShowCaseState} from './reducers/showcase.reducer';
import {ItemsReducer, ItemsState} from './reducers/items.reducer';
import {BrandReducer, BrandsState} from './reducers/brands.reducer';
import {SubLineReducer, SubLineState} from './reducers/sublines.reducer';
import {ItemReducer, ItemState} from './reducers/item.reducer';
import {OrderReducer, OrderState} from "./reducers/order.reducer";


export interface AppState {
  authState: AuthState;
  uiState: UiState;
  cartState: CartState;
  sublinesState: SubLineState;
  brandsState: BrandsState;
  showcaseState: ShowCaseState;
  itemsState: ItemsState;
  itemState: ItemState;
  orderState: OrderState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  authState: AuthReducer,
  uiState: UiReducer,
  cartState: CartReducer,
  sublinesState: SubLineReducer,
  brandsState: BrandReducer,
  showcaseState: ShowcaseReducer,
  itemsState: ItemsReducer,
  itemState: ItemReducer,
  orderState: OrderReducer
};
