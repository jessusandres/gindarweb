import {AllowedOrders, FilterTypes, ShowcaseActions} from '../actions/showcase.actions';
import {ItemInterface} from '../../interfaces/item.interface';


export interface ShowCaseState {
  filteredItems: ItemInterface[];
  showFilter: boolean;
  line: number;
  brandCode: number;
  order: AllowedOrders;
  query: string;
}

const initState: ShowCaseState = {
  filteredItems: [],
  showFilter: false,
  line: 0,
  brandCode: 0,
  order: AllowedOrders.NAME,
  query: null,
};

export const ShowcaseReducer = (state: ShowCaseState = initState, action: ShowcaseActions): ShowCaseState => {

  const ITEM_ORDER = (a, b) => {
    if (state.order === AllowedOrders.LOWEST_PRICE) {
      return a.webPrice > b.webPrice ? 1 : -1;
    } else if (state.order === AllowedOrders.HIGHEST_PRICE) {
      return a.webPrice > b.webPrice ? -1 : 1;
    } else {
      return a.description < b.description ? -1 : 1;
    }

  };

  switch (action.type) {
    case FilterTypes.SET_BRAND: {
      return {
        ...state,
        brandCode: action.payload.brandCode,
        showFilter: true,
        filteredItems: action.payload.items.filter(item => {
          return item.brandCode === action.payload.brandCode;
        }).sort(ITEM_ORDER)
      };


    }
    case FilterTypes.SET_SUBLINE: {
      return {
        ...state,
        line: action.payload.sublineCode,
        showFilter: true,
        filteredItems: action.payload.items.filter(item => {
          const fullCode = action.payload.sublineCode.toString().split('-');
          return item.code.substr(0, 6) === fullCode[1]
            && item.ruc.substr(0, 2) === fullCode[0];
        }).sort(ITEM_ORDER)
      };
    }
    case FilterTypes.SET_ORDER: {
      return {
        ...state,
        order: action.payload.order,
        showFilter: true,
        filteredItems: action.payload.items.map(item => item).sort((a, b) => {
          if (action.payload.order === AllowedOrders.LOWEST_PRICE) {
            return a.webPrice > b.webPrice ? 1 : -1;
          } else if (action.payload.order === AllowedOrders.HIGHEST_PRICE) {
            return a.webPrice > b.webPrice ? -1 : 1;
          } else {
            return a.description < b.description ? -1 : 1;
          }

        })

      };
    }
    case FilterTypes.SET_QUERY: {
      return {
        ...state,
        query: action.payload.query,
        showFilter: false
      };
    }
    case FilterTypes.SHOW_FILTERED_ITEMS: {
      return {
        ...state,
        showFilter: true
      };
    }
    case FilterTypes.SET_FILTERED_ITEMS: {
      return {
        ...state,
        filteredItems: action.payload.items
      };
    }
    case FilterTypes.HIDE_FILTERED_ITEMS: {
      return {
        ...state,
        line: 0,
        brandCode: 0,
        order: AllowedOrders.NAME,
        showFilter: false,
        filteredItems: action.payload.items
      };
    }
    default: {
      return {...state};
    }
  }
};

