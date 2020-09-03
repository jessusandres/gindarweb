import {Action} from '@ngrx/store';


export enum UiTypes {
  SET_PAGE= '[UI] SET PAGE',
}

export class SetPageAction implements Action{
  readonly type = UiTypes.SET_PAGE;
  constructor(public payload: { page: string, isExpanded: boolean }) {
  }
}

export type UiActions = SetPageAction;
