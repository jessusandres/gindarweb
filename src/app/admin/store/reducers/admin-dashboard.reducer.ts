import {GindarInfoInterface} from '../../interfaces/gindar-info.interface';

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
  loaded: false
};


export const AdminGStoreReducer = (state: AdminGStoreState = initialState, action): AdminGStoreState => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
