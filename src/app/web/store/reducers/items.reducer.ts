import {ItemInterface} from '../../interfaces/item.interface';
import {ItemsActions, ItemsTypes} from '../actions/items.actions';

export interface ItemsState {
  isLoading: boolean;
  items: ItemInterface[];
  errorMessage: string;
  releaseLoading: boolean;
  releaseErrorMessage: string;
  releaseItems: ItemInterface[];
  promotionalLoading: boolean;
  promotionalErrorMessage: string;
  promotionalItems: ItemInterface[];
}

const initialState: ItemsState = {
  isLoading: false,
  errorMessage: null,
  items: [],
  promotionalLoading: false,
  promotionalErrorMessage: null,
  promotionalItems: [],
  releaseLoading: false,
  releaseErrorMessage: null,
  releaseItems: []
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
    case ItemsTypes.LOAD_ITEMS_BY_SUBLINE: {
      return {
        ...state,
        items: [],
        isLoading: true,
        errorMessage: null
      };
    }
    case ItemsTypes.LOAD_ITEMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        errorMessage: null,
      };
    }
    case ItemsTypes.LOAD_ITEMS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        items: [],
        errorMessage: action.payload.message
      };
    }
    case ItemsTypes.LOAD_PROMOTIONAL_ITEMS: {
      return {
        ...state,
        promotionalLoading: true,
        promotionalErrorMessage: null,
        promotionalItems: [],
      };
    }
    case ItemsTypes.LOAD_PROMOTIONAL_ITEMS_FAILURE: {
      return {
        ...state,
        promotionalLoading: false,
        promotionalItems: [],
        promotionalErrorMessage: action.payload.message
      };
    }
    case ItemsTypes.LOAD_PROMOTIONAL_ITEMS_SUCCESS: {
      return {
        ...state,
        promotionalLoading: false,
        promotionalItems: action.payload.items,
        promotionalErrorMessage: null,
      };
    }
    case ItemsTypes.LOAD_RELEASE_ITEMS: {
      return {
        ...state,
        releaseLoading: true,
        releaseErrorMessage: null,
        releaseItems: []
      };
    }
    case ItemsTypes.LOAD_RELEASE_ITEMS_FAILURE: {
      return {
        ...state,
        releaseLoading: false,
        releaseItems: [],
        releaseErrorMessage: action.payload.message
      };
    }
    case ItemsTypes.LOAD_RELEASE_ITEMS_SUCCESS: {
      return {
        ...state,
        releaseLoading: false,
        releaseErrorMessage: null,
        releaseItems: action.payload.items
      };
    }
    default: {
      return state;
    }
  }
};


