import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {AuthTypes, LoginFailureAction, LoginSuccessAction} from '../actions/auth.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {UserModel} from '../../models/model-actions/user.model';
import {of} from 'rxjs';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              public authService: AuthService) {
  }

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthTypes.LOGIN_USER),
    mergeMap((payload: any) => this.authService.login(payload.name, payload.email).pipe(
      map((user: UserModel) => new LoginSuccessAction({user})),
      catchError((err) => {
        console.log(err);
        return of(new LoginFailureAction({errorCode: 1, errorMessage: 'error'}));
      })
    ))
  ));
}
