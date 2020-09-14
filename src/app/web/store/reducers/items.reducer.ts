import {ItemInterface} from '../../interfaces/item.interface';
import {ItemsActions, ItemsTypes} from '../actions/items.actions';

export interface ItemsState {
  isLoading: boolean;
  items: ItemInterface[];
  errorMessage: string;
}

const initialState: ItemsState = {
  errorMessage: null,
  isLoading: false,
  items: []
};

export const ItemsReducer = (state = initialState, action: ItemsActions): ItemsState => {
  switch (action.type) {
    case ItemsTypes.LOAD_ITEMS_BY_QUERY: {
      return {
        ...state,
        items: [],
        isLoading: true,
        errorMessage: null,
      };
    }
    case ItemsTypes.LOAD_ITEMS_SUCCESS: {
      return {
        isLoading: false,
        items: action.payload.items,
        errorMessage: null,
      };
    }
    case ItemsTypes.LOAD_ITEMS_FAILURE: {
      return {
        isLoading: false,
        items: [],
        errorMessage: action.payload.message
      };
    }
    default: {
      return state;
    }
  }
};


