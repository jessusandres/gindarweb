import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ItemsService} from '../../services/items.service';
import {
  ItemTypes,
  LoadingItemDetailAction,
  LoadingItemDetailFailureAction,
  LoadingItemDetailSuccessAction,
} from '../actions/item.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions, private readonly itemsService: ItemsService) {
  }

  @Effect()
  LoadItemDetail = this.actions$.pipe(
    ofType(ItemTypes.LOADING_ITEM_DETAIL),
    mergeMap((loadItemAction: LoadingItemDetailAction) => {
      const {payload} = loadItemAction;
      return this.itemsService.getItemDetail(payload.ruc, payload.itemCode)
        .pipe(
          map((response) => {
            const [item, images] = response;
            return new LoadingItemDetailSuccessAction({item, images});
          }),
          catchError((err) => of(new LoadingItemDetailFailureAction({message: err.error.message})))
        );
    })
  );

}

