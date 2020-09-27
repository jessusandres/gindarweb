import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {
  AuthSyncAwait,
  AuthTypes, GuardLoginAction,
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
  RegisterAction,
  RegisterFailureAction, StatusLoginAction, StatusSuccessAction
} from '../actions/auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {LogUserModel, UserModel, UserRegisterModel} from '../../models/user.model';
import {of} from 'rxjs';
import {EmptyCartAction, LoadCartAction, SyncAwaitAction, SyncLocalCartAction} from '../actions/cart.actions';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              public authService: AuthService) {
  }

  @Effect()
  LogIn = this.actions$.pipe(
    ofType(AuthTypes.LOGIN_USER),
    mergeMap((loginAction: LoginAction) => {
        const loguser: LogUserModel = loginAction.payload.user;

        return this.authService.login(loguser.email, loguser.password).pipe(
          map((user: UserModel) => new LoginSuccessAction({user, status: false})),
          catchError((err) => of(new LoginFailureAction({
            errorCode: err.status,
            errorMessage: err.error.message
          })))
        );

      }
    )
  );

  @Effect()
  Register = this.actions$.pipe(
    ofType(AuthTypes.REGISTER_USER),
    mergeMap((registerAction: RegisterAction) => {
      const userRegisterModel: UserRegisterModel = registerAction.payload.user;
      return this.authService.register(userRegisterModel).pipe(
        map((user: UserModel) => new LoginSuccessAction({user, status: false})),
        catchError((err) => of(new RegisterFailureAction({message: err.error.message})))
      );
    })
  );

  @Effect({dispatch: false})
  LogOut = this.actions$.pipe(
    ofType(AuthTypes.LOGOUT_USER),
    tap(() => {
      this.authService.logout();
    })
  );

  @Effect({dispatch: false})
  FailureLogin = this.actions$.pipe(
    ofType(AuthTypes.LOGIN_USER_FAILURE),
    tap(() => {
      this.authService.removeToken();
    })
  );


  @Effect()
  GuardLogin = this.actions$.pipe(
    ofType(AuthTypes.GUARD_LOGIN),
    mergeMap((statusAction: GuardLoginAction) => {
        return this.authService.verifyLogin(statusAction.payload.redirect).pipe(
          map((user: UserModel) => {
            if (!user.id) {
              return new LoginFailureAction({errorCode: 500, errorMessage: null});
            }
            return new LoginSuccessAction({user, status: true});
          }),
          catchError((err) => of(new LoginFailureAction({errorCode: 500, errorMessage: err.error?.message})))
        );

      }
    )
  );

  @Effect()
  StatusLogin = this.actions$.pipe(
    ofType(AuthTypes.STATUS_LOGIN),
    mergeMap(() => {
        return this.authService.verifyLogin(false).pipe(
          map((user: UserModel) => {
            if (!user.id) {
              return new LoginFailureAction({errorCode: 500, errorMessage: null});
            }
            return new StatusSuccessAction({user});
          }),
          catchError((err) => of(new LoginFailureAction({errorCode: 500, errorMessage: err.error?.message})))
        );

      }
    )
  );

  @Effect()
  StatusSuccessLoginCart = this.actions$.pipe(
    ofType(AuthTypes.STATUS_LOGIN_SUCCESS),
    mergeMap(() => of(new LoadCartAction()))
  );

  @Effect()
  SuccessLoginCart = this.actions$.pipe(
    ofType(AuthTypes.LOGIN_USER_SUCCESS),
    mergeMap((action: LoginSuccessAction) => {
      if (!action.payload.status) {
        return of(new LoadCartAction());
      }
      return of(new AuthSyncAwait());
    })
  );

  @Effect()
  LoginLocalCart = this.actions$.pipe(
    ofType(AuthTypes.LOGIN_USER_SUCCESS),
    mergeMap((action: LoginSuccessAction) => {
      if (!action.payload.status) {
        return of(new SyncLocalCartAction());
      }
      return of(new SyncAwaitAction());

    })
  );

  @Effect()
  FailureLoginCart = this.actions$.pipe(
    ofType(AuthTypes.LOGIN_USER_FAILURE),
    mergeMap(() => {
        return of(new EmptyCartAction());
      }
    )
  );

  @Effect()
  LogoutLoginCart = this.actions$.pipe(
    ofType(AuthTypes.LOGOUT_USER),
    mergeMap(() => {
        return of(new EmptyCartAction());
      }
    )
  );

}
