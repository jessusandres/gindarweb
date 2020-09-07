import {environment} from '../../environments/environment';

export const BASE_URL = environment.baseUrl;
export const MAPS_API_KEY = `AIzaSyCH9IbzA58rKcYubPHC_z1ZbBmTCob_pDY`;

export const MAP_LAT = -6.7705459;
export const MAP_LNG = -79.8395662;

export const EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const NUMBER_REGEX: RegExp = new RegExp('^\\d+$');
