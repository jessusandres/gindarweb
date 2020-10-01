import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ItemsService} from '../../services/items.service';
import {
  ItemsTypes,
  LoadingItemsFailureAction,
  LoadingItemsSuccessAction,
  LoadItemsByQueryAction,
  LoadItemsBySubLineAction,
  LoadPromotionalItemsFailureAction,
  LoadPromotionalItemsSuccessAction,
  LoadReleaseItemsFailureAction,
  LoadReleaseItemsSuccessAction
} from '../actions/items.actions';
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

  @Effect()
  loadItemBySubLIneEffect = this.actions$.pipe(
    ofType(ItemsTypes.LOAD_ITEMS_BY_SUBLINE),
    mergeMap((action: LoadItemsBySubLineAction) => {
      return this.itemsService.getItemsForSubline(action.payload.subline)
        .pipe(
          map((items) => new LoadingItemsSuccessAction({items})),
          catchError((err) => of(new LoadingItemsFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  loadReleaseItemEffect = this.actions$.pipe(
    ofType(ItemsTypes.LOAD_RELEASE_ITEMS),
    mergeMap(() => {
      return this.itemsService.getReleaseItems()
        .pipe(
          map((items) => new LoadReleaseItemsSuccessAction({items})),
          catchError((err) => {
            return of(new LoadReleaseItemsFailureAction({message: err.error.message}));
          })
        );
    })
  );

  @Effect()
  loadPromotionalItemEffect = this.actions$.pipe(
    ofType(ItemsTypes.LOAD_PROMOTIONAL_ITEMS),
    mergeMap(() => {
      return this.itemsService.getPromotionalItems()
        .pipe(
          map((items) => new LoadPromotionalItemsSuccessAction({items})),
          catchError((err) => {
            return of(new LoadPromotionalItemsFailureAction({message: err.error.message}));
          })
        );
    })
  );

}

