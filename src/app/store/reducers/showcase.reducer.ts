import {AllowedOrders, FilterTypes, ShowcaseActions} from '../actions/showcase.actions';


export interface ShowCaseState {
  category: number;
  subCategoryCode: number;
  size: string;
  brandCode: number;
  order: AllowedOrders;
  query: string;
}

const initState: ShowCaseState = {
  brandCode: 0,
  category: 0,
  order: AllowedOrders.NAME,
  size: '',
  subCategoryCode: 0,
  query: null,
};

export const ShowcaseReducer = (state: ShowCaseState = initState, action: ShowcaseActions): ShowCaseState => {
  switch (action.type) {
    case FilterTypes.SET_BRAND: {
      return {
        ...state,
        brandCode: action.payload.brandCode
      };
    }
    case FilterTypes.SET_CATEGORY: {
      return {
        ...state,
        category: action.payload.categoryCode
      };
    }
    case FilterTypes.SET_ORDER: {
      return {
        ...state,
        order: action.payload.order
      };
    }
    case FilterTypes.SET_SIZE: {
      return {
        ...state,
        size: action.payload.size
      };
    }
    case FilterTypes.SET_SUB_CATEGORY: {
      return {
        ...state,
        subCategoryCode: action.payload.subCategoryCode
      };
    }
    case FilterTypes.SET_QUERY: {
      return {
        ...state,
        query: action.payload.query
      };
    }
    default: {
      return {...state};
    }
  }
};

