import {Action} from '@ngrx/store';
import {AdvertisementItem, InvictaItem, SliderItem} from '../../interfaces/ui.interfaces';


export enum UiTypes {
  SET_PAGE = '[UI] SET PAGE',
  SET_ITEM_NAME = '[UI] SET ITEM NAME',
  UI_REMOVE_NAME = '[UI] REMOVE ITEM NAME',
  UI_LOAD_ADVERTISEMENTS = '[UI] LOAD ADVERTISEMENTS',
  UI_LOAD_ADVERTISEMENTS_SUCCESS = '[UI] LOAD ADVERTISEMENTS SUCCESS',
  UI_LOAD_ADVERTISEMENTS_FAILURE = '[UI] LOAD ADVERTISEMENTS FAILURE',
  UI_LOAD_CARROUSEL = '[UI] LOAD CARROUSEL',
  UI_LOAD_CARROUSEL_SUCCESS = '[UI] LOAD CARROUSEL SUCCESS',
  UI_LOAD_CARROUSEL_FAILURE = '[UI] LOAD CARROUSEL FAILURE',
  UI_LOAD_INVICTA_MENU = '[UI] LOAD INVICTA MENU',
  UI_LOAD_INVICTA_MENU_SUCCESS = '[UI] LOAD INVICTA MENU SUCCESS',
}

export class SetPageAction implements Action {
  readonly type = UiTypes.SET_PAGE;

  constructor(public payload: { page: string, isExpanded: boolean }) {
  }
}

export class SetItemNameAction implements Action {
  readonly type = UiTypes.SET_ITEM_NAME;

  constructor(public payload: { itemName: string }) {
  }

}

export class RemoveItemNameAction implements Action {
  readonly type = UiTypes.UI_REMOVE_NAME;
}

export class LoadAdvertisementsAction implements Action {
  readonly type = UiTypes.UI_LOAD_ADVERTISEMENTS;
}

export class LoadAdvertisementsSuccessAction implements Action {
  readonly type = UiTypes.UI_LOAD_ADVERTISEMENTS_SUCCESS;

  constructor(public payload: { advertisements: AdvertisementItem[] }) {
  }
}

export class LoadAdvertisementsFailureAction implements Action {
  readonly type = UiTypes.UI_LOAD_ADVERTISEMENTS_FAILURE;
}

export class LoadCarrouselAction implements Action {
  readonly type = UiTypes.UI_LOAD_CARROUSEL;
}

export class LoadCarrouselSuccessAction implements Action {
  readonly type = UiTypes.UI_LOAD_CARROUSEL_SUCCESS;

  constructor(public payload: { images: SliderItem[] }) {
  }
}

export class LoadCarrouselFailureAction implements Action {
  readonly type = UiTypes.UI_LOAD_CARROUSEL_FAILURE;
}

export class LoadInvictaMenuAction implements Action {
  readonly type = UiTypes.UI_LOAD_INVICTA_MENU;
}

export class LoadInvictaMenuSuccessAction implements Action {
  readonly type = UiTypes.UI_LOAD_INVICTA_MENU_SUCCESS;

  constructor(public payload: { items: InvictaItem[][] }) {
  }
}


export type UiActions = SetPageAction |
  SetItemNameAction |
  RemoveItemNameAction |
  LoadAdvertisementsAction |
  LoadAdvertisementsSuccessAction |
  LoadAdvertisementsFailureAction |
  LoadCarrouselAction |
  LoadCarrouselSuccessAction |
  LoadCarrouselFailureAction |
  LoadInvictaMenuAction |
  LoadInvictaMenuSuccessAction;
