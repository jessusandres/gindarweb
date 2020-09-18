import {Action} from '@ngrx/store';
import {ItemInterface} from '../../interfaces/item.interface';

export enum AllowedOrders {
  LOWEST_PRICE = 'LOWEST PRICE',
  HIGHEST_PRICE = 'HIGHEST PRICE',
  NAME = 'NAME',
}

export enum FilterTypes {
  SET_SUBLINE = '[SHOWCASE] SET LINE',
  SET_BRAND = '[SHOWCASE] SET BRAND',
  SET_ORDER = '[SHOWCASE] SET ORDER',
  SET_QUERY = '[SHOWCASE] SET QUERY',
  SHOW_FILTERED_ITEMS = '[SHOWCASE] SHOW FILTERED ITEMS',
  HIDE_FILTERED_ITEMS = '[SHOWCASE] HIDE FILTERED ITEMS',
  SET_FILTERED_ITEMS = '[SHOWCASE] SET FILTERED ITEMS',
}

export class SetSubLineAction implements Action {
  readonly type = FilterTypes.SET_SUBLINE;

  constructor(public payload: { items: ItemInterface[]; sublineCode: number }) {
  }
}

export class SetBrandAction implements Action {
  readonly type = FilterTypes.SET_BRAND;

  constructor(public payload: { items: ItemInterface[]; brandCode: number }) {
  }
}

export class SetOrderAction implements Action {
  readonly type = FilterTypes.SET_ORDER;

  constructor(public payload: { items: ItemInterface[]; order: AllowedOrders }) {
  }
}

export class SetQueryAction implements Action {
  readonly type = FilterTypes.SET_QUERY;

  constructor(public payload: { query: string }) {
  }
}

export class ShowFilteredItemsAction implements Action {
  readonly type = FilterTypes.SHOW_FILTERED_ITEMS;
}

export class HideFilteredItemsAction implements Action {
  readonly type = FilterTypes.HIDE_FILTERED_ITEMS;

  constructor(public payload: { items: ItemInterface[] }) {
  }
}

export class SetFilteredItemsAction implements Action {
  readonly type = FilterTypes.SET_FILTERED_ITEMS;

  constructor(public payload: { items: ItemInterface[] }) {
  }
}

export type ShowcaseActions = SetFilteredItemsAction |
  SetSubLineAction |
  SetBrandAction |
  SetOrderAction |
  SetQueryAction |
  ShowFilteredItemsAction |
  HideFilteredItemsAction;

