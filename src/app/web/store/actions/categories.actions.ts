import {Action} from '@ngrx/store';
import {CategoriesModel} from '../../models/categories.model';


export enum CategoriesTypes {
  GET_CATEGORIES = '[CATEGORIES] LOAD',
  SET_CATEGORIES = '[CATEGORIES] SET',
}

export class GetCategoriesAction implements Action {
  readonly type = CategoriesTypes.GET_CATEGORIES;
}

export class SetCategoriesAction implements Action {
  readonly type = CategoriesTypes.SET_CATEGORIES;
  constructor( public payload: { categories: CategoriesModel[] } ) {
  }
}

export type CategoriesActions = GetCategoriesAction | SetCategoriesAction;

