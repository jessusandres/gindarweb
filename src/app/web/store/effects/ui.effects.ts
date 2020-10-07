import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {GenericDataService} from '../../services/generic-data.service';
import {
  LoadAdvertisementsSuccessAction,
  LoadCarrouselSuccessAction,
  LoadCoverSquaresFailureAction,
  LoadCoverSquaresSuccessAction,
  LoadGenderMenuFailureAction,
  LoadGenderMenuSuccessAction,
  LoadInvictaMenuSuccessAction,
  LoadStoreInfoFailureAction,
  LoadStoreInfoSuccessAction, LoadWhatsappNumbersFailureAction,
  LoadWhatsappNumbersSuccessAction,
  UiTypes
} from '../actions/ui.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ItemsService} from '../../services/items.service';

@Injectable()
export class UiEffects {
  constructor(private actions$: Actions,
              public genericDataService: GenericDataService,
              public itemsService: ItemsService) {
  }

  @Effect()
  StoreInfoEffect = this.actions$.pipe(
    ofType(UiTypes.UI_LOAD_STORE_INFO),
    mergeMap(() => {
      return this.genericDataService.getStoreInfo()
        .pipe(
          map((info) => new LoadStoreInfoSuccessAction({info})),
          catchError(err => of(new LoadStoreInfoFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  SlidersEffect = this.actions$.pipe(
    ofType(UiTypes.UI_LOAD_CARROUSEL),
    mergeMap(() => {
      return this.genericDataService.getSliders()
        .pipe(
          map((sliders) => new LoadCarrouselSuccessAction({images: sliders}))
        );
    })
  );

  @Effect()
  AdvertisementssEffect = this.actions$.pipe(
    ofType(UiTypes.UI_LOAD_ADVERTISEMENTS),
    mergeMap(() => {
      return this.itemsService.getAdvertisements()
        .pipe(
          map((advertisements) => new LoadAdvertisementsSuccessAction({advertisements}))
        );
    })
  );

  @Effect()
  InvictaMenuEffect = this.actions$.pipe(
    ofType(UiTypes.UI_LOAD_INVICTA_MENU),
    mergeMap(() => {
      return this.genericDataService.getInvictaMenu()
        .pipe(
          map((items) => new LoadInvictaMenuSuccessAction({items})),
          catchError(() => of(new LoadGenderMenuFailureAction))
        );
    })
  );

  @Effect()
  GenderMenuEffect = this.actions$.pipe(
    ofType(UiTypes.UI_LOAD_GENDER_MENU),
    mergeMap(() => {
      return this.genericDataService.getGenderMenu()
        .pipe(
          map((menu) => new LoadGenderMenuSuccessAction({menu})),
          catchError(() => of(new LoadGenderMenuFailureAction()))
        );
    })
  );

  @Effect()
  CoverSquaresEffect = this.actions$.pipe(
    ofType(UiTypes.UI_LOAD_COVER_SQUARES),
    mergeMap(() => {
      return this.genericDataService.getCoverSquares()
        .pipe(
          map((squares) => new LoadCoverSquaresSuccessAction({squares})),
          catchError(() => of(new LoadCoverSquaresFailureAction()))
        );
    })
  );

  @Effect()
  WebPhonesEffect = this.actions$.pipe(
    ofType(UiTypes.UI_LOAD_COVER_SQUARES),
    mergeMap(() => {
      return this.genericDataService.getWebPhones()
        .pipe(
          map((phones) => new LoadWhatsappNumbersSuccessAction({phones})),
          catchError((err) => of(new LoadWhatsappNumbersFailureAction({message: err.error.message})))
        );
    })
  );

}
