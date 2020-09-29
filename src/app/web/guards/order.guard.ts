import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {filter, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  waitForDataToLoad(): Observable<any> {
    return this.store.select(state => state.orderState).pipe(
      filter(orderState => {
        if (orderState.order === null) {
          this.router.navigate(['/']);
        }
        return orderState.order !== null
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.waitForDataToLoad().pipe(
      switchMap(() => {
        return of(true);
      })
    );
  }

}
