import {AuthReducer, AuthState} from './reducers/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {UiReducer, UiState} from './reducers/ui.reducer';
import {CategoriesReducer, CategoriesState} from './reducers/categories.reducer';
import {CartReducer, CartState} from './reducers/cart.reducer';
import {ShowcaseReducer, ShowCaseState} from './reducers/showcase.reducer';


export interface AppState {
  authState: AuthState;
  uiState: UiState;
  categoriesState: CategoriesState;
  cartState: CartState;
  showcaseState: ShowCaseState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  authState: AuthReducer,
  uiState: UiReducer,
  categoriesState: CategoriesReducer,
  cartState: CartReducer,
  showcaseState: ShowcaseReducer
};
