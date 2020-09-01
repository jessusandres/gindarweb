import {AuthReducer, AuthState} from './reducers/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';


export interface AppState {
  authState: AuthState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  authState: AuthReducer
};
