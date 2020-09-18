import {Action} from '@ngrx/store';


export enum UiTypes {
  SET_PAGE = '[UI] SET PAGE',
  SET_ITEM_NAME = '[UI] SET ITEM NAME',
  UI_REMOVE_NAME = '[UI] REMOVE ITEM NAME',
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

export type UiActions = SetPageAction | SetItemNameAction |RemoveItemNameAction;
