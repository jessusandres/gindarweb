import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {
  AuthTypes,
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
  LogoutAction,
  RegisterAction,
  RegisterFailureAction
} from '../actions/auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {LogUserModel, UserModel, UserRegisterModel} from '../../models/user.model';
import {of} from 'rxjs';
import {Router} from '@angular/router';


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
          map((user: UserModel) => new LoginSuccessAction({user})),
          catchError((err) => {
            return of(new LoginFailureAction({errorCode: 1, errorMessage: err.error.message}));
          })
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
        map((user: UserModel) => new LoginSuccessAction({user})),
        catchError((err) => {
          console.warn(err);
          console.log(err.error);
          return of(new RegisterFailureAction({message: err.error.message}));
        })
      );
    })
  );

  @Effect({dispatch: false})
  LogOut = this.actions$.pipe(
    ofType(AuthTypes.LOGOUT_USER),
    tap(() => {
      this.authService.removeToken();
    })
  );


  @Effect()
  StatusLog = this.actions$.pipe(
    ofType(AuthTypes.STATUS_LOGIN),
    mergeMap(() => {
        return this.authService.verifyLogin().pipe(
          map((user: UserModel) => {
            console.log('map');
            console.log(user);
            if (!user.id) {
              return new LoginFailureAction({errorCode: 500, errorMessage: null});
            }
            // return token;
            return new LoginSuccessAction({user});
          }),
          catchError((err) => {
            console.warn(err);
            return of(new LoginFailureAction({errorCode: 500, errorMessage: null}));
          })
        );

      }
    )
  );

}