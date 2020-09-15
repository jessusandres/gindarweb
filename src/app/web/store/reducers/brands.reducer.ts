import {BrandInterface} from '../../interfaces/brand.interface';
import {BrandsActions, BrandsTypes} from '../actions/brands.actions';


export interface BrandsState {
  brands: BrandInterface[];
  loaded: boolean;
  loading: boolean;
  errorMessage: string;
}

const initialState: BrandsState = {
  brands: [],
  loaded: false,
  loading: false,
  errorMessage: null
};

export const BrandReducer = (state = initialState, action: BrandsActions): BrandsState => {
  switch (action.type) {
    case BrandsTypes.LOAD_BRANDS: {
      return {
        brands: [],
        loading: true,
        loaded: false,
        errorMessage: null,
      };
    }
    case BrandsTypes.LOAD_BRANDS_FAILURE: {
      return {
        brands: [],
        loading: false,
        loaded: false,
        errorMessage: action.payload.message,
      };
    }
    case BrandsTypes.LOAD_BRANDS_SUCCESS: {
      return {
        brands: action.payload.brands,
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
