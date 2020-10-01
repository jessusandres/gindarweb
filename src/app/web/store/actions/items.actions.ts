import {Action} from '@ngrx/store';
import {ItemInterface} from '../../interfaces/item.interface';


export enum ItemsTypes {
  LOAD_ITEMS_BY_QUERY = '[ITEMS] LOAD ITEMS BY QUERY',
  LOAD_ITEMS_BY_SUBLINE = '[ITEMS] LOAD ITEMS BY SUBLINE',
  LOAD_ITEMS_SUCCESS = '[ITEMS] LOAD ITEM SUCCESS',
  LOAD_ITEMS_FAILURE = '[ITEMS] LOAD ITEM FAILURE',
  LOAD_RELEASE_ITEMS = '[ITEMS] LOAD RELASE ITEMS',
  LOAD_RELEASE_ITEMS_SUCCESS = '[ITEMS] LOAD RELASE ITEM SUCCESS',
  LOAD_RELEASE_ITEMS_FAILURE = '[ITEMS] LOAD RELASE ITEM FAILURE',
  LOAD_PROMOTIONAL_ITEMS = '[ITEMS] LOAD PROMOTIONAL ITEMS',
  LOAD_PROMOTIONAL_ITEMS_SUCCESS = '[ITEMS] LOAD PROMOTIONAL ITEM SUCCESS',
  LOAD_PROMOTIONAL_ITEMS_FAILURE = '[ITEMS] LOAD PROMOTIONAL ITEM FAILURE',
}

export class LoadItemsByQueryAction implements Action {
  readonly type = ItemsTypes.LOAD_ITEMS_BY_QUERY;

  constructor(public payload: { text: string }) {
  }
}

export class LoadItemsBySubLineAction implements Action {
  readonly type = ItemsTypes.LOAD_ITEMS_BY_SUBLINE;

  constructor(public payload: { subline: string }) {
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

export class LoadReleaseItemsAction implements Action {
  readonly type = ItemsTypes.LOAD_RELEASE_ITEMS;
}

export class LoadReleaseItemsSuccessAction implements Action {
  readonly type = ItemsTypes.LOAD_RELEASE_ITEMS_SUCCESS;

  constructor(public payload: { items: ItemInterface[] }) {
  }
}

export class LoadReleaseItemsFailureAction implements Action {
  readonly type = ItemsTypes.LOAD_RELEASE_ITEMS_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class LoadPromotionalItemsAction implements Action {
  readonly type = ItemsTypes.LOAD_PROMOTIONAL_ITEMS;
}

export class LoadPromotionalItemsSuccessAction implements Action {
  readonly type = ItemsTypes.LOAD_PROMOTIONAL_ITEMS_SUCCESS;

  constructor(public payload: { items: ItemInterface[] }) {
  }
}

export class LoadPromotionalItemsFailureAction implements Action {
  readonly type = ItemsTypes.LOAD_PROMOTIONAL_ITEMS_FAILURE;

  constructor(public payload: { message: string }) {
  }
}


export type ItemsActions = LoadingItemsFailureAction |
  LoadItemsByQueryAction |
  LoadItemsBySubLineAction |
  LoadingItemsSuccessAction |
  LoadReleaseItemsAction |
  LoadReleaseItemsSuccessAction |
  LoadReleaseItemsFailureAction |
  LoadPromotionalItemsSuccessAction |
  LoadPromotionalItemsFailureAction |
  LoadPromotionalItemsAction;
