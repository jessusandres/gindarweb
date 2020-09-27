import {UiActions, UiTypes} from '../actions/ui.actions';
import {AdvertisementItem, InvictaItem, SliderItem} from '../../interfaces/ui.interfaces';

export interface UiState {
  isExpanded: boolean;
  lastPage: string;
  itemDetailName: string;
  advertisements: AdvertisementItem[];
  sliders: SliderItem[];
  invictaMenuTags: InvictaItem[][];
}


const initialState: UiState = {
  isExpanded: false,
  lastPage: '',
  itemDetailName: null,
  sliders: [{image: 'slider_1.jpg'}],
  advertisements: [{title: 'Obteniendo Marquesinas'}],
  invictaMenuTags: []
};

export const UiReducer = (state: UiState = initialState, action: UiActions): UiState => {
  switch (action.type) {
    case UiTypes.SET_PAGE: {
      return {
        ...state,
        lastPage: action.payload.page,
        isExpanded: action.payload.isExpanded
      };
    }
    case UiTypes.SET_ITEM_NAME: {
      return {
        ...state,
        itemDetailName: action.payload.itemName
      };
    }
    case UiTypes.UI_REMOVE_NAME: {
      return {
        ...state,
        itemDetailName: null
      };
    }
    case UiTypes.UI_LOAD_ADVERTISEMENTS_SUCCESS: {
      return {
        ...state,
        advertisements: action.payload.advertisements
      };
    }
    case UiTypes.UI_LOAD_CARROUSEL_SUCCESS: {
      return {
        ...state,
        sliders: action.payload.images
      };
    }
    case UiTypes.UI_LOAD_INVICTA_MENU_SUCCESS: {
      return {
        ...state,
        invictaMenuTags: action.payload.items
      };
    }
    default: {
      return {...state};
    }
  }
};


