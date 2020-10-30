import {environment} from '../../environments/environment';

export const BASE_URL = environment.baseUrl;
export const MAPS_API_KEY = `AIzaSyCH9IbzA58rKcYubPHC_z1ZbBmTCob_pDY`;

export const MAP_LAT = -6.7705459;
export const MAP_LNG = -79.8395662;

export const EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const WEB_REGEX: RegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const SPLIT_REGEX: RegExp = /\W+/;

export const NUMBER_REGEX: RegExp = new RegExp('^\\d+$');

export const CULQI_KEY = `pk_live_61f98ad0a7652375`;

export const VisaStyles = {
  base: {
    color: 'black',
    margin: '0',
    // width: '100% !important',
    // fontWeight: 700,
    fontFamily: 'Montserrat, sans-serif',
    // fontSize: '16px',
    fontSmoothing: 'antialiased',
    placeholder: {
      color: '#999999'
    },
    autofill: {
      color: '#e39f48',
    }
  },
  invalid: {
    color: '#E25950',
    '::placeholder': {
      color: '#FFCCA5',
    }
  }
};

