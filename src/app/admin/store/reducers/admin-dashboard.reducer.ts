import {GindarInfoInterface} from '../../interfaces/gindar-info.interface';
import {AdminDashboardActions, AdminDashboardTypes} from '../actions/admin-dashboard.actions';

export interface AdminGStoreState extends GindarInfoInterface {
  ruc: string;
  businessReason: string;
  phone1: string;
  phone2: string;
  phone3: string;
  email: string;
  address1: string;
  address2: string;
  descriptionMeta: string;
  facebookLink1: string;
  facebookLink2: string;
  instagramLink: string;
  youtubeLink: string;
  twitterLink: string;
  messengerLink: string;
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}

const initialState: AdminGStoreState = {
  ruc: null,
  businessReason: null,
  phone1: null,
  phone2: null,
  phone3: null,
  email: null,
  address1: null,
  address2: null,
  descriptionMeta: null,
  facebookLink1: null,
  facebookLink2: null,
  instagramLink: null,
  youtubeLink: null,
  twitterLink: null,
  messengerLink: null,
  loading: false,
  loaded: false,
  errorMessage: null
};


export const AdminGStoreReducer = (state: AdminGStoreState = initialState, action: AdminDashboardActions): AdminGStoreState => {
  switch (action.type) {
    case AdminDashboardTypes.UPDATE_STORE_INFO: {
      return {
        ...state,
        loading: true,
      };
    }
    case AdminDashboardTypes.STORE_INFO: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case AdminDashboardTypes.STORE_INFO_SUCCESS: {
      return {
        ...state,
        ...action.payload.info,
        loaded: true,
        loading: false
      };
    }
    case AdminDashboardTypes.STORE_INFO_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        errorMessage: action.payload.message
      };
    }

    default: {
      return state;
    }
  }
};
