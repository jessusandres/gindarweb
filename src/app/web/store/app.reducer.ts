import {AuthReducer, AuthState} from './reducers/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {UiReducer, UiState} from './reducers/ui.reducer';
import {CartReducer, CartState} from './reducers/cart.reducer';
import {ShowcaseReducer, ShowCaseState} from './reducers/showcase.reducer';
import {ItemsReducer, ItemsState} from './reducers/items.reducer';
import {BrandReducer, BrandsState} from './reducers/brands.reducer';


export interface AppState {
  authState: AuthState;
  uiState: UiState;
  cartState: CartState;
  showcaseState: ShowCaseState;
  itemsState: ItemsState;
  brandsState: BrandsState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  authState: AuthReducer,
  uiState: UiReducer,
  cartState: CartReducer,
  showcaseState: ShowcaseReducer,
  itemsState: ItemsReducer,
  brandsState: BrandReducer
};
