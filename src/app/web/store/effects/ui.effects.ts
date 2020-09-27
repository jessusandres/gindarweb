import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {GenericDataService} from '../../services/generic-data.service';
import {LoadAdvertisementsSuccessAction, LoadCarrouselSuccessAction, LoadInvictaMenuSuccessAction, UiTypes} from '../actions/ui.actions';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class UiEffects {
  constructor(private actions$: Actions, public genericDataService: GenericDataService) {
  }

  @Effect()
  SlidersEffect = this.actions$.pipe(
    ofType(UiTypes.UI_LOAD_CARROUSEL),
    mergeMap(() => {
      return this.genericDataService.getSliders()
        .pipe(
          map((images) => new LoadCarrouselSuccessAction({images}))
        );
    })
  );

  @Effect()
  AdvertisementssEffect = this.actions$.pipe(
    ofType(UiTypes.UI_LOAD_ADVERTISEMENTS),
    mergeMap(() => {
      return this.genericDataService.getAdvertisements()
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
          map((items) => new LoadInvictaMenuSuccessAction({items}))
        );
    })
  );

}
