import {Action} from '@ngrx/store';
import {LogUserModel, UserModel, UserRegisterModel} from '../../models/user.model';

export enum AuthTypes {
  LOGIN_USER = '[AUTH] LOGIN USER',
  LOGIN_USER_SUCCESS = '[AUTH] LOGIN SUCCESS',
  LOGIN_USER_FAILURE = '[AUTH] LOGIN FAILURE',
  REGISTER_USER = '[AUTH] REGISTER USER',
  REGISTER_USER_SUCCESS = '[AUTH] REGISTER SUCCESS',
  REGISTER_USER_FAILURE = '[AUTH] REGISTER FAILURE',
  LOGOUT_USER = '[AUTH] LOGOUT USER',
  STATUS_LOGIN = '[AUTH] STATUS LOGIN',
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

  constructor(public payload: { errorCode: number, errorMessage: string }) {
  }
}

export class RegisterAction implements Action {
  readonly type = AuthTypes.REGISTER_USER;

  constructor(public payload: { user: UserRegisterModel }) {
  }
}

export class RegisterSuccessAction implements Action {
  readonly type = AuthTypes.REGISTER_USER_SUCCESS;

  constructor(public payload: { user: UserModel }) {
  }
}

export class RegisterFailureAction implements Action {
  readonly type = AuthTypes.REGISTER_USER_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class LogoutAction implements Action {
  readonly type = AuthTypes.LOGOUT_USER;
}

export class StatusLoginAction implements Action {
  readonly type = AuthTypes.STATUS_LOGIN;
}

export type AuthActions = LoginAction |
  LoginSuccessAction |
  LoginFailureAction |
  RegisterAction |
  RegisterSuccessAction |
  RegisterFailureAction |
  LogoutAction |
  StatusLoginAction;
