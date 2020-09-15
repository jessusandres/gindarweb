import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {GindarService} from '../../../admin/services/gindar.service';
import {BrandsTypes, LoadBrandsFailureAcion, LoadBrandsSuccessAction} from '../actions/brands.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class BrandsEffects {
  constructor(private actions$: Actions, private gindarService: GindarService) {
  }

  @Effect()
  loadBrands = this.actions$.pipe(
    ofType(BrandsTypes.LOAD_BRANDS),
    mergeMap(() => {
      return this.gindarService.getBrands()
        .pipe(
          map((brands) => new LoadBrandsSuccessAction({brands})),
          catchError((err) => of(new LoadBrandsFailureAcion({message: err.error.message})))
        );
    })
  );

}

