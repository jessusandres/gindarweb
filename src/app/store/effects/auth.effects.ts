import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {AuthTypes, LoginAction, LoginFailureAction, LoginSuccessAction} from '../actions/auth.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {LogUserModel, UserModel} from '../../models/user.model';
import {of} from 'rxjs';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              public authService: AuthService) {
  }

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthTypes.LOGIN_USER),
    mergeMap((loginAction: LoginAction) => {
        const loguser: LogUserModel = loginAction.payload.user;
        return this.authService.login(loguser.name, loguser.password).pipe(
          map((user: UserModel) => new LoginSuccessAction({user})),
          catchError((err) => {
            console.warn(err);
            return of(new LoginFailureAction({errorCode: 1, errorMessage: 'error'}));
          })
        );
      }
    )
  ));
}
