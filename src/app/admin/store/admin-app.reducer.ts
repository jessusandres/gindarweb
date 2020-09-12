import {AdminGStoreReducer, AdminGStoreState} from './reducers/admin-dashboard.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AppAuthAdminState} from './reducers/admin-auth.reducer';


export interface InternalAdminState {
  gstoreState: AdminGStoreState;
}

export interface AppAdminState extends AppAuthAdminState {
  adminState: InternalAdminState;
}

export const AdminAppReducer: ActionReducerMap<InternalAdminState> = {
  gstoreState: AdminGStoreReducer,
};

export const selectFeature = createFeatureSelector<AppAdminState, InternalAdminState>('adminState');

export const selectFeatureGStore = createSelector(
  selectFeature,
  (state: InternalAdminState) => state.gstoreState
);
