import {Action} from '@ngrx/store';

export enum AllowedOrders {
  LOWEST_PRICE = 'LOWEST PRICE',
  HIGHEST_PRICE = 'HIGHEST PRICE',
  NAME = 'NAME',
}

export enum FilterTypes {
  SET_CATEGORY = '[SHOWCASE] SET CATEGORY',
  SET_SUB_CATEGORY = '[SHOWCASE] SET SUB CATEGORY',
  SET_SIZE = '[SHOWCASE] SET SIZE',
  SET_BRAND = '[SHOWCASE] SET BRAND',
  SET_ORDER = '[SHOWCASE] SET ORDER',
  SET_QUERY = '[SHOWCASE] SET QUERY',
}

export class SetCategoryAction implements Action {
  readonly type = FilterTypes.SET_CATEGORY;

  constructor(public payload: { categoryCode: number }) {
  }
}

export class SetSubCategoryAction implements Action {
  readonly type = FilterTypes.SET_SUB_CATEGORY;

  constructor(public payload: { subCategoryCode: number }) {
  }
}

export class SetSizeAction implements Action {
  readonly type = FilterTypes.SET_SIZE;

  constructor(public payload: { size: string }) {
  }
}

export class SetBrandAction implements Action {
  readonly type = FilterTypes.SET_BRAND;

  constructor(public payload: { brandCode: number }) {
  }
}

export class SetOrderAction implements Action {
  readonly type = FilterTypes.SET_ORDER;

  constructor(public payload: { order: AllowedOrders }) {
  }
}

export class SetQueryAction implements Action {
  readonly type = FilterTypes.SET_QUERY;

  constructor(public payload: { query: string }) {
  }
}

export type ShowcaseActions = SetCategoryAction |
  SetSubCategoryAction |
  SetSizeAction |
  SetBrandAction |
  SetOrderAction |
  SetQueryAction;

