import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {AuthState} from '../store/reducers/auth.reducer';
import {catchError, filter, map, mergeMap, retry, switchMap, take, tap} from 'rxjs/operators';
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
    this.store.dispatch(new StatusLoginAction());

    return this.waitForDataToLoad().pipe(
      switchMap(() => {
        return of(true);
      })
    );

  }


// canActivate(
//   next: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot): Observable<boolean> {
//
//   return this.getFromStoreOrAPI().pipe(
//     catchError(err => {
//       console.log(err);
//       this.router.navigate(['/']);
//       return of(false);
//
//     })
//   );
//
//   // return this.store.select('authState').pipe(
//   //   map((authState) => {
//   //     console.log(authState);
//   //     return authState.isLoading;
//   //   }),
//   //   take(1)
//   // );
//   // return this.authService.verifyLogin().pipe(
//   //   map((res: any) => {
//   //     console.log(res);
//   //     if (res.id) {
//   //       return true;
//   //     }
//   //     this.router.navigate(['/']);
//   //     return false;
//   //   })
//   // );
// }

}
