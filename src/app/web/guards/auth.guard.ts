import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import { filter, switchMap} from 'rxjs/operators';
import {StatusLoginAction} from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>) {
  }

  waitForDataToLoad(): Observable<any> {
    return this.store.select(state => state.authState).pipe(
      filter(authState => !authState.isLoading)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(new StatusLoginAction({redirect: true}));

    return this.waitForDataToLoad().pipe(
      switchMap(() => {
        return of(true);
      })
    );

  }

}
