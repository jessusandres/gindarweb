import {CategoriesActions, CategoriesTypes} from '../actions/categories.actions';
import {CategoriesModel} from '../../models/categories.model';
import {ItemInterface} from '../../interfaces/item.interface';

export interface CategoriesState {
  categories: CategoriesModel[];
}

const manItems: ItemInterface[] = [
  {code: '123', name: 'Invicta 1'},
  {code: '123', name: 'Invicta 2'},
  {code: '123', name: 'Invicta 3'},
  {code: '123', name: 'Invicta 4'},
];

const initialState: CategoriesState = {
    categories: [
      new CategoriesModel('hombre', '01', manItems),
      new CategoriesModel('mujer', '02', []),
    ],
  }
;

export const CategoriesReducer = (state: CategoriesState = initialState, action: CategoriesActions): CategoriesState => {
  switch (action.type) {
    case CategoriesTypes.SET_CATEGORIES: {
      return {
        categories: action.payload.categories
      };
    }
    default: {
      return state;
    }
  }
};


