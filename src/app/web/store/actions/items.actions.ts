import {Action} from '@ngrx/store';
import {ItemModel} from '../../models/item.model';


export enum ItemsTypes {
  LOAD_ITEMS = '[ITEMS] LOAD ITEMS',
  LOAD_ITEMS_SUCCESS = '[ITEMS] LOAD ITEM SUCCESS',
  LOAD_ITEMS_FAILURE = '[ITEMS] LOAD ITEM FAILURE',
}

export class LoadItemsAction implements Action {
  readonly type = ItemsTypes.LOAD_ITEMS;
}

export class LoadingItemsSuccessAction implements Action {
  readonly type = ItemsTypes.LOAD_ITEMS_SUCCESS;

  constructor(public payload: { items: ItemModel[] }) {
  }
}

export class LoadingItemsFailureAction implements Action {
  readonly type = ItemsTypes.LOAD_ITEMS_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export type ItemsActions = LoadingItemsFailureAction | LoadItemsAction | LoadingItemsSuccessAction;
