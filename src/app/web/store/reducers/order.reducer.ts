import {OrderInterface, OrderParamsInterface} from '../../interfaces/order.interface';
import {OrderActions, OrderTypes} from '../actions/order.actions';
import {VisaSessionInterface} from '../../interfaces/visa-session.interface';

export interface OrderState {
  loading: boolean;
  infoMessage: string;
  error: boolean;
  errorMessage: string;
  culqiTokenError: boolean;
  culqiTokenErrorMessage: string;
  culqiToken: string;
  orderParams: OrderParamsInterface;
  order: OrderInterface;
  visaSessionLoading: boolean;
  visaSessionParams: VisaSessionInterface;
}

const initialState: OrderState = {
  infoMessage: null,
  culqiToken: '',
  culqiTokenError: false,
  culqiTokenErrorMessage: '',
  error: false,
  errorMessage: '',
  loading: false,
  order: null,
  orderParams: null,
  visaSessionLoading: false,
  visaSessionParams: null
};

export const OrderReducer = (state: OrderState = initialState, action: OrderActions): OrderState => {
  switch (action.type) {
    case OrderTypes.SWITCH_ORDER: {
      return {
        ...state,
        loading: true,
        infoMessage: 'Iniciando transacción...'
      };
    }
    case OrderTypes.GENERATE_TOKEN: {
      return {
        ...state,
        loading: true,
        infoMessage: 'Validando Registro...'
      };
    }
    case OrderTypes.GENERATE_TOKEN_FAILURE: {
      return {
        ...state,
        loading: false,
        infoMessage: null,
        culqiTokenError: true,
        culqiTokenErrorMessage: action.payload.message,
        culqiToken: null
      };
    }
    case OrderTypes.GENERATE_TOKEN_SUCCESS: {
      return {
        ...state,
        culqiTokenErrorMessage: null,
        culqiTokenError: false,
        culqiToken: action.payload.params.paymentToken,
        infoMessage: 'Generando cargo...'
      };
    }
    case OrderTypes.SEND_ORDER: {
      return {
        ...state,
        loading: true,
        orderParams: action.payload.orderParams,
        infoMessage: 'Generando pedido...'
      };
    }
    case OrderTypes.SEND_ORDER_FAILURE: {
      return {
        ...state,
        loading: false,
        infoMessage: null,
        error: true,
        errorMessage: action.payload.message
      };
    }
    case OrderTypes.SEND_ORDER_SUCESS: {
      return {
        ...state,
        loading: false,
        errorMessage: null,
        error: false,
        order: action.payload.order,
        infoMessage: null
      };
    }
    case OrderTypes.RESET_ORDER: {
      return {
        ...initialState
      };
    }
    case OrderTypes.GENERATE_VISA_SESSION: {
      return {
        ...initialState,
        visaSessionLoading: true,
        visaSessionParams: null,
      };
    }
    case OrderTypes.GENERATE_VISA_SESSION_FAILURE: {
      return {
        ...initialState,
        visaSessionLoading: false,
        visaSessionParams: null,
        error: true,
        errorMessage: action.payload.message,
      };
    }
    case OrderTypes.GENERATE_VISA_SESSION_SUCCESS: {
      return {
        ...initialState,
        visaSessionLoading: false,
        visaSessionParams: action.payload.visaSession,
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
