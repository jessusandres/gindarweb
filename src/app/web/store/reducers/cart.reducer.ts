import {CartItem} from '../../interfaces/cart_item.interface';
import {CartActions, CartTypes} from '../actions/cart.actions';


export interface CartState {
  items: CartItem[];
  loading: boolean;
  message: string;
  total: number;
}

const initialState: CartState = {
  items: [],
  loading: false,
  message: null,
  total: 0.00,
};

export const CartReducer = (state: CartState = initialState, action: CartActions): CartState => {
  switch (action.type) {
    case CartTypes.LOAD_CART: {
      return {
        ...state,
        loading: true,
        message: 'Cargando Carrito...'
      };
    }
    case CartTypes.LOAD_CART_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
        loading: false,
        message: null,
        total: action.payload.total
      };
    }
    case CartTypes.LOAD_CART_FAILURE: {
      return {
        ...state,
        items: [],
        total: 0.0,
        loading: false,
        message: action.payload.message
      };
    }
    case CartTypes.ADD_CART_ITEM: {
      return {
        ...state,
        loading: true,
      };
    }
    case CartTypes.ADD_CART_ITEM_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    }
    case CartTypes.ADD_CART_ITEM_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    }
    case CartTypes.DROP_CART_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.code !== action.payload.item.code),
        total: state.total - action.payload.item.webPrice
      };
    }
    case CartTypes.EMPTY_CART: {
      return {
        ...state,
        items: [],
        total: 0.0
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
      };
    case CartTypes.UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    default: {
      return {...state};
    }
  }
};
