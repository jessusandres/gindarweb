import {Action} from '@ngrx/store';
import {GindarInfoInterface} from '../../interfaces/gindar-info.interface';

export enum AdminDashboardTypes {
  STORE_INFO = '[GINDAR] GET INFO',
  STORE_INFO_SUCCESS = '[GINDAR] GET INFO SUCCESS',
  STORE_INFO_FAILURE = '[GINDAR] GET INFO FAILURE',
  UPDATE_STORE_INFO = '[GINDAR] UPDATE STORE INFO'
}


export class AdminStoreInfoAction implements Action {
  readonly type = AdminDashboardTypes.STORE_INFO;
}

export class AdminStoreInfoSuccessAction implements Action {
  readonly type = AdminDashboardTypes.STORE_INFO_SUCCESS;

  constructor(public payload: { info: GindarInfoInterface }) {
  }
}

export class AdminStoreInfoFailureAction implements Action {
  readonly type = AdminDashboardTypes.STORE_INFO_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class AdminUpdateStoreInfoAction implements Action {
  readonly type = AdminDashboardTypes.UPDATE_STORE_INFO;

  constructor(public payload: { info: GindarInfoInterface }) {
  }
}


export type AdminDashboardActions = AdminStoreInfoAction |
  AdminStoreInfoSuccessAction |
  AdminStoreInfoFailureAction |
  AdminUpdateStoreInfoAction;


