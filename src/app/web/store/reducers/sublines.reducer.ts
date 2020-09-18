import {SublineInterface} from '../../interfaces/subline.interface';
import {SubLinesActions, SubLineTypes} from '../actions/sublines.actions';

export interface SubLineState {
  loaded: boolean;
  loading: boolean;
  sublines: SublineInterface[];
  errorMessage: string;
}

const initialState: SubLineState = {
  errorMessage: null,
  loaded: false,
  loading: false,
  sublines: []
};

export const SubLineReducer = (state: SubLineState = initialState, action: SubLinesActions): SubLineState => {
  switch (action.type) {
    case SubLineTypes.LOAD_SUBLINES: {
      return {
        sublines: [],
        loading: true,
        loaded: false,
        errorMessage: null
      };
    }
    case SubLineTypes.LOAD_SUBLINES_FAILURE: {
      return {
        errorMessage: action.payload.message,
        loaded: false,
        loading: false,
        sublines: []
      };
    }
    case SubLineTypes.LOAD_SUBLINES_SUCCESS: {
      return {
        sublines: action.payload.sublines,
        loading: false,
        loaded: true,
        errorMessage: null,
      };
    }
    default: {
      return state;
    }
  }
};
