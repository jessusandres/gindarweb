import {UserModel} from '../../models/user.model';
import {AuthActions, AuthTypes} from '../actions/auth.actions';

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: UserModel;
  errorMessage: string | null;
}

const initialState: AuthState = {
  errorMessage: null, isAuthenticated: false, user: null, isLoading: false
};

export const AuthReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthTypes.LOGIN_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AuthTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        isAuthenticated: true,
        user: action.payload.user
      };
    case AuthTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage
      };
    case AuthTypes.REGISTER_USER: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        user: null,
        isAuthenticated: false,
      };
    }
    case AuthTypes.REGISTER_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message
      };
    }
    case AuthTypes.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        user: action.payload.user
      };
    }
    case AuthTypes.STATUS_LOGIN: {
      return {
        ...state,
        isLoading: true
      };
    }
    case AuthTypes.LOGOUT_USER: {
      return initialState;
    }
    default: {
      return {...state};
    }
  }
};


