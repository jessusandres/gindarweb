import {CartInterface} from '../../interfaces/cart_item.interface';
import {CartActions, CartTypes} from '../actions/cart.actions';
import {StoreSelected} from '../../interfaces/ui.interfaces';


export interface CartState {
  gCart: CartInterface[];
  rCart: CartInterface[];
  oCart: CartInterface[];
  coupons: string[];
  storeSelected: StoreSelected;
  loading: boolean;
  message: string;
  errorMessage: string;
  actionLoading: boolean;
  actionMessage: string;
  actionErrorMessage: string;
  couponErrorMessage: string;
  couponMessage: string;
  amount: number;
  total: number;
  showCartForm: boolean;
  voucher: boolean;
  onlinePayment: boolean;
}

const initialState: CartState = {
  couponErrorMessage: null,
  couponMessage: null,
  gCart: [],
  rCart: [],
  oCart: [],
  coupons: [],
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
  voucher: false
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
        gCart: action.payload.gCart,
        rCart: action.payload.rCart,
        oCart: action.payload.oCart,
        loading: false,
        actionLoading: false,
        message: null,
        actionErrorMessage: null,
        amount: action.payload.amount,
        total: action.payload.total,
        coupons: action.payload.coupons
      };
    }
    case CartTypes.LOAD_CART_FAILURE: {
      return {
        ...state,
        gCart: [],
        rCart: [],
        oCart: [],
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
        actionErrorMessage: null,
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
    case CartTypes.CART_TOGGLE_ONLINE_PAYMENT: {
      return {
        ...state,
        onlinePayment: action.payload.status
      };
    }
    case CartTypes.CART_TOGGLE_VOUCHER: {
      return {
        ...state,
        voucher: action.payload.status
      };
    }
    // case CartTypes.SET_COUPONS: {
    //   return {
    //     ...state,
    //     coupons: action.payload.coupons
    //   };
    // }
    case CartTypes.APPLY_COUPON: {
      return {
        ...state,
        actionLoading: true,
      };
    }
    case CartTypes.APPLY_COUPON_FAILURE: {
      return {
        ...state,
        actionLoading: false,
        couponErrorMessage: action.payload.message
      };
    }
    case CartTypes.APPLY_COUPON_SUCCESS: {
      return {
        ...state,
        couponErrorMessage: null,
        actionLoading: false,
        couponMessage: action.payload.message
      };
    }
    case CartTypes.REMOVE_COUPON: {
      return {
        ...state,
        actionLoading: true,
      };
    }
    case CartTypes.REMOVE_COUPON_FAILRE: {
      return {
        ...state,
        actionLoading: false,
        couponErrorMessage: action.payload.message
      };
    }
    case CartTypes.REMOVE_COUPON_SUCCESS: {
      return {
        ...state,
        actionLoading: false,
        actionErrorMessage: null,
        couponMessage: action.payload.message
      };
    }
    case CartTypes.REMOVE_COUPON_MESSAGES: {
      return {
        ...state,
        couponErrorMessage: null,
        couponMessage: null
      };
    }
    default: {
      return {...state};
    }
  }
};
