import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CartService} from '../../services/cart.service';
import {
  AddCartItemAction,
  AddCartItemFailureAction,
  AddCartItemSuccessAction,
  CartTypes,
  DropCartItemAction,
  DropCartItemFailureAction,
  DropCartItemSuccessAction,
  LoadCartAction,
  LoadCartFailureAction,
  LoadCartSuccessAction,
  UpdateCartItemAction,
  UpdateCartItemFailureAction,
  UpdateCartItemSuccessAction
} from '../actions/cart.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private readonly cartService: CartService) {
  }

  @Effect()
  loadCart = this.actions$.pipe(
    ofType(CartTypes.LOAD_CART),
    mergeMap(() => {
      return this.cartService.getCart().pipe(
        map((data) => new LoadCartSuccessAction({
          gcart: data.gcart,
          rcart: data.rcart,
          ocart: data.ocart,
          amount: data.amount,
          total: data.total
        })),
        catchError((err) => {
          console.log(err);
          return of(new LoadCartFailureAction({message: err.error.message}));
        })
      );
    })
  );

  @Effect()
  addItemCart = this.actions$.pipe(
    ofType(CartTypes.ADD_CART_ITEM),
    mergeMap((action: AddCartItemAction) => {
      return this.cartService.addItemCart(action.payload.item, action.payload.amount)
        .pipe(
          map((message) => new AddCartItemSuccessAction({message})),
          catchError((err) => of(new AddCartItemFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  updateItemCart = this.actions$.pipe(
    ofType(CartTypes.UPDATE_CART_ITEM),
    mergeMap((action: UpdateCartItemAction) => {
      return this.cartService.updateItemCart(action.payload.item, action.payload.amount)
        .pipe(
          map((message) => new UpdateCartItemSuccessAction({message})),
          catchError((err) => of(new UpdateCartItemFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  removeItemCart = this.actions$.pipe(
    ofType(CartTypes.DROP_CART_ITEM),
    mergeMap((action: DropCartItemAction) => {
      return this.cartService.removeItem(action.payload.item)
        .pipe(
          map((message) => new DropCartItemSuccessAction({message})),
          catchError((err) => of(new DropCartItemFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  addCart = this.actions$.pipe(
    ofType(CartTypes.ADD_CART_ITEM_SUCCESS),
    mergeMap(() => of(new LoadCartAction()))
  );

  @Effect()
  updateCart = this.actions$.pipe(
    ofType(CartTypes.UPDATE_CART_ITEM_SUCESS),
    mergeMap(() => of(new LoadCartAction()))
  );

  @Effect()
  removeCart = this.actions$.pipe(
    ofType(CartTypes.DROP_CART_ITEM_SUCCESS),
    mergeMap(() => of(new LoadCartAction()))
  );
}
