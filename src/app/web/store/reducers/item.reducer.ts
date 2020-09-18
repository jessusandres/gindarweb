import {ItemInterface} from '../../interfaces/item.interface';
import {ImageInterface} from '../../interfaces/image.interface';
import {ItemActions, ItemTypes} from '../actions/item.actions';


export interface ItemState {
  loading: boolean;
  item: ItemInterface;
  errorMessage: string;
  images: ImageInterface[];
}

const initialState: ItemState = {
  errorMessage: null,
  images: [],
  item: null,
  loading: false
};

export const ItemReducer = (state: ItemState = initialState, action: ItemActions): ItemState => {
  switch (action.type) {
    case ItemTypes.LOADING_ITEM_DETAIL: {
      return {
        ...state,
        loading: true,
      };
    }
    case ItemTypes.LOADING_ITEM_DETAIL_FAILURE: {
      return {
        loading: false,
        item: null,
        images: [],
        errorMessage: action.payload.message
      };
    }
    case ItemTypes.LOADING_ITEM_DETAIL_SUCCESS: {
      return {
        errorMessage: null,
        item: action.payload.item,
        images: action.payload.images,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
};


