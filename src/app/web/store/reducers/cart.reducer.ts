import {CartInterface} from '../../interfaces/cart_item.interface';
import {CartActions, CartTypes} from '../actions/cart.actions';
import {StoreSelected} from "../../interfaces/ui.interfaces";


export interface CartState {
  gcart: CartInterface[];
  rcart: CartInterface[];
  ocart: CartInterface[];
  storeSelected: StoreSelected;
  loading: boolean;
  message: string;
  errorMessage: string;
  actionLoading: boolean;
  actionMessage: string;
  actionErrorMessage: string;
  amount: number;
  total: number;
  showCartForm: boolean;
  voucher: boolean;
  onlinePayment: boolean;
}

const initialState: CartState = {
  gcart: [],
  rcart: [],
  ocart: [],
  loading: false,
  storeSelected: null,
  message: null,
  errorMessage: null,
  actionLoading: false,
  actionMessage: null,
  actionErrorMessage: null,
  amount: 0.00,
  total: 0.00,
  showCartForm: false,
  onlinePayment: false,
  voucher: false,
};

export const CartReducer = (state: CartState = initialState, action: CartActions): CartState => {
  switch (action.type) {
    case CartTypes.LOAD_CART: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
        onlinePayment: false,
        voucher: false,
        showCartForm: false,
        message: 'Cargando Carrito...'
      };
    }
    case CartTypes.LOAD_CART_SUCCESS: {
      return {
        ...state,
        errorMessage: null,
        actionMessage: null,
        gcart: action.payload.gcart,
        rcart: action.payload.rcart,
        ocart: action.payload.ocart,
        loading: false,
        actionLoading: false,
        message: null,
        actionErrorMessage: null,
        amount: action.payload.amount,
        total: action.payload.total,
      };
    }
    case CartTypes.LOAD_CART_FAILURE: {
      return {
        ...state,
        gcart: [],
        rcart: [],
        ocart: [],
        total: 0.0,
        amount: 0,
        loading: false,
        actionMessage: null,
        message: null,
        errorMessage: action.payload.message
      };
    }
    case CartTypes.ADD_CART_ITEM: {
      return {
        ...state,
        actionLoading: true,
      };
    }
    case CartTypes.ADD_CART_ITEM_FAILURE: {
      return {
        ...state,
        actionLoading: false,
        message: null,
        actionMessage: null,
        actionErrorMessage: action.payload.message
      };
    }
    case CartTypes.ADD_CART_ITEM_SUCCESS: {
      return {
        ...state,
        actionLoading: false,
        errorMessage: null,
        message: null,
        actionMessage: action.payload.message,
      };
    }
    case CartTypes.ADD_LOCAL_ITEM: {
      return {
        ...state,
        actionLoading: true
      };
    }
    case CartTypes.ADD_LOCAL_ITEM_SUCCESS: {
      return {
        ...state,
        actionLoading: false,
        actionMessage: action.payload.message
      };
    }
    case CartTypes.SYNC_LOCAL_CART: {
      return {
        ...state,
        actionLoading: true
      };
    }
    case CartTypes.DROP_CART_ITEM: {
      return {
        ...state,
        loading: true,
      };
    }
    case CartTypes.EMPTY_CART: {
      return {
        ...initialState
      };
    }
    case CartTypes.UPDATE_CART_ITEM:
      return {
        ...state,
        loading: true,
      };
    case CartTypes.UPDATE_CART_ITEM_SUCESS:
      return {
        ...state,
        loading: false,
        message: null,
        actionMessage: action.payload.message
      };
    case CartTypes.UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        message: null,
        actionMessage: null,
        errorMessage: action.payload.message
      };
    case CartTypes.DROP_CART_ITEM_FAILURE: {
      return {
        ...state,
        actionErrorMessage: action.payload.message
      };
    }
    case CartTypes.DROP_CART_ITEM_SUCCESS: {
      return {
        ...state,
        actionErrorMessage: null,
        actionMessage: action.payload.message
      };
    }
    case CartTypes.CART_SET_STORE: {
      return {
        ...state,
        storeSelected: {
          name: action.payload.name,
          ruc: action.payload.ruc
        }
      };
    }
    case CartTypes.CART_SHOW_FORM: {
      return {
        ...state,
        showCartForm: action.payload.show
      };
    }
    default: {
      return {...state};
    }
  }
};
