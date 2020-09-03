import {AuthReducer, AuthState} from './reducers/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {UiReducer, UiState} from './reducers/ui.reducer';
import {CategoriesReducer, CategoriesState} from './reducers/categories.reducer';


export interface AppState {
  authState: AuthState;
  uiState: UiState;
  categoriesState: CategoriesState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  authState: AuthReducer,
  uiState: UiReducer,
  categoriesState: CategoriesReducer
};
