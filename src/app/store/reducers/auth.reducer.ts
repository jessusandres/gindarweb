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

export const AuthReducer = (state: AuthState = initialState, actions: AuthActions): AuthState => {
  switch (actions.type) {
    case AuthTypes.LOGIN_USER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AuthTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: actions.payload.errorMessage
      };
    case AuthTypes.LOGIN_USER_SUCCESS:
      return  {
        ...state,
        isLoading: false,
        errorMessage: null,
        isAuthenticated: true,
        user: actions.payload.user
      };
    case AuthTypes.LOGOUT_USER: {
      return initialState;
    }
    default: {
      return {...state};
    }
  }
};


