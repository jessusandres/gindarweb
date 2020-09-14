import {Action} from '@ngrx/store';
import {ItemInterface} from '../../interfaces/item.interface';


export enum ItemsTypes {
  LOAD_ITEMS_BY_QUERY = '[ITEMS] LOAD ITEMS BY QUERY',
  LOAD_ITEMS_SUCCESS = '[ITEMS] LOAD ITEM SUCCESS',
  LOAD_ITEMS_FAILURE = '[ITEMS] LOAD ITEM FAILURE',
}

export class LoadItemsByQueryAction implements Action {
  readonly type = ItemsTypes.LOAD_ITEMS_BY_QUERY;
  constructor(public payload: { text: string}) {
  }
}

export class LoadingItemsSuccessAction implements Action {
  readonly type = ItemsTypes.LOAD_ITEMS_SUCCESS;

  constructor(public payload: { items: ItemInterface[] }) {
  }
}

export class LoadingItemsFailureAction implements Action {
  readonly type = ItemsTypes.LOAD_ITEMS_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export type ItemsActions = LoadingItemsFailureAction | LoadItemsByQueryAction | LoadingItemsSuccessAction;
