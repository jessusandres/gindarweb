import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ItemsService} from '../../services/items.service';
import {ItemsTypes, LoadingItemsFailureAction, LoadingItemsSuccessAction, LoadItemsByQueryAction} from '../actions/items.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, private itemsService: ItemsService) {
  }

  @Effect()
  loadItemEffect = this.actions$.pipe(
    ofType(ItemsTypes.LOAD_ITEMS_BY_QUERY),
    mergeMap((action: LoadItemsByQueryAction) => {
      return this.itemsService.getItemsForQuery(action.payload.text)
        .pipe(
          map((items) => new LoadingItemsSuccessAction({items})),
          catchError((err) => {
            return of(new LoadingItemsFailureAction({message: err.error.message}));
          })
        );
    })
  );
}

