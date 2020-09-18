import {UiActions, UiTypes} from '../actions/ui.actions';

export interface UiState {
  isExpanded: boolean;
  lastPage: string;
  itemDetailName: string;
}


const initialState: UiState = {
  isExpanded: false,
  lastPage: '',
  itemDetailName: null,
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
    default: {
      return {...state};
    }
  }
};


