import {Action} from '@ngrx/store';
import {ItemInterface} from '../../interfaces/item.interface';
import {ImageInterface} from '../../interfaces/image.interface';

export enum ItemTypes {
  LOADING_ITEM_DETAIL = '[ITEM] LOADING ITEM DETAIL',
  LOADING_ITEM_DETAIL_SUCCESS = '[ITEM] LOADING ITEM DETAIL SUCCESS',
  LOADING_ITEM_DETAIL_FAILURE = '[ITEM] LOADING ITEM DETAIL FAILURE',
}

export class LoadingItemDetailAction implements Action {
  readonly type = ItemTypes.LOADING_ITEM_DETAIL;

  constructor(public payload: { ruc: string; itemCode: string }) {
  }
}

export class LoadingItemDetailSuccessAction implements Action {
  readonly type = ItemTypes.LOADING_ITEM_DETAIL_SUCCESS;

  constructor(public payload: { item: ItemInterface, images: ImageInterface[] }) {
  }
}

export class LoadingItemDetailFailureAction implements Action {
  readonly type = ItemTypes.LOADING_ITEM_DETAIL_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export type ItemActions = LoadingItemDetailAction |
  LoadingItemDetailSuccessAction |
  LoadingItemDetailFailureAction ;
