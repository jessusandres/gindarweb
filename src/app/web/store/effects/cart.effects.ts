import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CartService} from '../../services/cart.service';
import {
  AddCartItemAction,
  AddCartItemFailureAction,
  AddCartItemSuccessAction,
  AddLocalItemAction,
  AddLocalItemSuccessAction,
  ApplyCouponAction,
  ApplyCouponFailureAction,
  ApplyCouponSuccessAction,
  CartTypes,
  DropCartItemAction,
  DropCartItemFailureAction,
  DropCartItemSuccessAction,
  LoadCartAction,
  LoadCartFailureAction,
  LoadCartSuccessAction, RemoveCouponFailureAction, RemoveCouponSuccessAction,
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
          ...data
        })),
        catchError((err) => {
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
  addLocalItem = this.actions$.pipe(
    ofType(CartTypes.ADD_LOCAL_ITEM),
    mergeMap((action: AddLocalItemAction) => {
        return this.cartService.addLocalItem(action.payload.item, action.payload.amount)
          .pipe(
            map((message) => new AddLocalItemSuccessAction({message}))
          );
      }
    )
  );

  @Effect()
  SyncLocalCart = this.actions$.pipe(
    ofType(CartTypes.SYNC_LOCAL_CART),
    mergeMap(() => {
      return this.cartService.syncCart()
        .pipe(
          map(() => new LoadCartAction()),
          catchError(() => of(new AddCartItemFailureAction({message: 'Algunos items no se agregaron correctamente al carrito.'})))
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

  @Effect()
  applyCoupon = this.actions$.pipe(
    ofType(CartTypes.APPLY_COUPON),
    mergeMap((action: ApplyCouponAction) => {
      return this.cartService.applyCoupon(action.payload.coupon)
        .pipe(
          map((message) => new ApplyCouponSuccessAction({message})),
          catchError(err => of(new ApplyCouponFailureAction({message: err.error.message})))
        );
    })
  );

  @Effect()
  removeCoupon = this.actions$.pipe(
    ofType(CartTypes.REMOVE_COUPON),
    mergeMap((action: ApplyCouponAction) => {
      return this.cartService.removeCoupon(action.payload.coupon)
        .pipe(
          map((message) => new RemoveCouponSuccessAction({message})),
          catchError(err => of(new RemoveCouponFailureAction({message: err.error.message})))
        );
    })
  );

}
