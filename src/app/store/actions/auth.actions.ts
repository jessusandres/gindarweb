import {Action} from '@ngrx/store';
import {LogUserModel, UserModel} from '../../models/user.model';

export enum AuthTypes {
  LOGIN_USER = '[AUTH] LOGIN USER',
  LOGIN_USER_SUCCESS = '[AUTH] LOGIN SUCCESS',
  LOGIN_USER_FAILURE = '[AUTH] LOGIN FAILURE',
  LOGOUT_USER = '[AUTH] LOGOUT USER'
}

export class LoginAction implements Action {
  readonly type = AuthTypes.LOGIN_USER;

  constructor(public payload: { user: LogUserModel }) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = AuthTypes.LOGIN_USER_SUCCESS;

  constructor(public payload: { user: UserModel }) {
  }
}

export class LoginFailureAction implements Action {
  readonly type = AuthTypes.LOGIN_USER_FAILURE;
  constructor(public payload: {errorCode: number, errorMessage: string}) {
  }
}

export class LogoutAction implements Action {
  readonly type = AuthTypes.LOGOUT_USER;
}

export type AuthActions = LoginAction | LogoutAction | LoginSuccessAction | LoginFailureAction;
