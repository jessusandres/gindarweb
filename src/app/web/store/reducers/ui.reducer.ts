import {UiActions, UiTypes} from '../actions/ui.actions';

export interface UiState {
  isExpanded: boolean;
  lastPage: string;
}


const initialState: UiState = {
  isExpanded: false,
  lastPage: ''
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
    default: {
      return {...state};
    }
  }
};


