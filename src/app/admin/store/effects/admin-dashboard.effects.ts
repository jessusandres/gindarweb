import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {GindarService} from '../../services/gindar.service';
import {
  AdminDashboardTypes,
  AdminStoreInfoFailureAction,
  AdminStoreInfoSuccessAction,
  AdminUpdateStoreInfoAction
} from '../actions/admin-dashboard.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {GindarInfoInterface} from '../../interfaces/gindar-info.interface';
import {of} from 'rxjs';


@Injectable()
export class AdminDashboardEffects {
  constructor(private actions$: Actions, private readonly gindarService: GindarService) {
  }

  @Effect()
  storeInfo = this.actions$.pipe(
    ofType(AdminDashboardTypes.STORE_INFO),
    mergeMap(() => {
      return this.gindarService.getStoreInfo().pipe(
        map((info: GindarInfoInterface) => {
          return new AdminStoreInfoSuccessAction({info});
        }),
        catchError((err) => {
          return of(new AdminStoreInfoFailureAction({message: err.error.message}));
        })
      );
    })
  );
  @Effect()
  updatestoreInfo = this.actions$.pipe(
    ofType(AdminDashboardTypes.UPDATE_STORE_INFO),
    mergeMap((updateStore: AdminUpdateStoreInfoAction) => {

      return this.gindarService.updateStoreInfo(updateStore.payload.info).pipe(
        map((info: GindarInfoInterface) => {
          return new AdminStoreInfoSuccessAction({info});
        }),
        catchError((err) => {
          return of(new AdminStoreInfoFailureAction({message: err.error.message}));
        })
      );
    })
  );

}
