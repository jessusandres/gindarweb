import {UserModel} from '../../models/user.model';
import {AuthActions, AuthTypes} from '../actions/auth.actions';

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: UserModel;
  authErrorMessage: string | null;
  registerErrorMessage: string | null;
}

const initialState: AuthState = {
  authErrorMessage: null, registerErrorMessage: null, isAuthenticated: false, user: null, isLoading: false
};

export const AuthReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthTypes.RESET_STATUS: {
      return initialState;
    }
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
        authErrorMessage: null,
        isAuthenticated: true,
        user: action.payload.user
      };
    case AuthTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        authErrorMessage: action.payload.errorMessage
      };
    case AuthTypes.REGISTER_USER: {
      return {
        ...state,
        isLoading: true,
        registerErrorMessage: null,
        user: null,
        isAuthenticated: false,
      };
    }
    case AuthTypes.REGISTER_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        registerErrorMessage: action.payload.message
      };
    }
    case AuthTypes.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        registerErrorMessage: null,
        user: action.payload.user
      };
    }
    case AuthTypes.STATUS_LOGIN: {
      return {
        ...state,
        isLoading: true
      };
    }
    case AuthTypes.STATUS_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authErrorMessage: null,
        isAuthenticated: true,
        user: action.payload.user
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


