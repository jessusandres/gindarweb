import {Injectable} from '@angular/core';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {OrderService} from '../../services/order.service';
import {
  GenerateOrderAction, GenerateOrderFailureAction, GenerateOrderSuccessAction,
  GenerateTokenFailureAction,
  GenerateTokenSuccessAction, GenerateVisaSessionAction, GenerateVisaSessionFailurection, GenerateVisaSessionSuccessAction,
  OrderTypes, SwitchOrderAction
} from '../actions/order.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {OrderParamsInterface} from '../../interfaces/order.interface';
import {LoadCartAction} from '../actions/cart.actions';
import {Router} from '@angular/router';
import {VisaSessionInterface} from '../../interfaces/visa-session.interface';


@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions,
              private readonly orderService: OrderService,
              private router: Router) {
  }

  @Effect()
  SendOrderEffect = this.actions$.pipe(
    ofType(OrderTypes.SEND_ORDER),
    mergeMap((action: GenerateOrderAction) => {

      return this.orderService.generateOrder(action.payload.orderParams, action.payload.type)
        .pipe(
          map((order) => new GenerateOrderSuccessAction({order})),
          catchError((err) => of(new GenerateOrderFailureAction({message: err.error.message})))
        );

    })
  );

  @Effect()
  TokenSuccessEffect = this.actions$.pipe(
    ofType(OrderTypes.GENERATE_TOKEN_SUCCESS),
    mergeMap((action: GenerateTokenSuccessAction) => {
      return of(new GenerateOrderAction({type: 2, orderParams: action.payload.params}));
    })
  );

  @Effect()
  OrderSuccess = this.actions$.pipe(
    ofType(OrderTypes.SEND_ORDER_SUCESS),
    mergeMap(() => {
      this.router.navigate(['confirmacion-pedido']);
      return of(new LoadCartAction());
    })
  );

  @Effect()
  SwitchOrderEffect = this.actions$.pipe(
    ofType(OrderTypes.SWITCH_ORDER),
    mergeMap((action: SwitchOrderAction) => {
      if (action.payload.orderParams.onlinePayment) {
        return this.orderService.generateToken(action.payload.orderParams)
          .pipe(
            map((params: OrderParamsInterface) => new GenerateTokenSuccessAction({params})),
            catchError((err) => {
              // console.log(err);
              return of(new GenerateTokenFailureAction({message: 'error'}));
            })
          );
      } else {
        if (action.payload.orderParams.voucher) {
          return of(new GenerateOrderAction({orderParams: action.payload.orderParams, type: 1}));
        } else {
          return of(new GenerateOrderAction({orderParams: action.payload.orderParams, type: 0}));
        }
      }
    })
  );

  @Effect()
  GenerateVisaSession = this.actions$.pipe(
    ofType(OrderTypes.GENERATE_VISA_SESSION),
    mergeMap((action: GenerateVisaSessionAction) => {
      return this.orderService.generateVisaSession(action.payload.total)
        .pipe(
          map((visaSession: VisaSessionInterface) => new GenerateVisaSessionSuccessAction({visaSession})),
          catchError((err) => of(new GenerateVisaSessionFailurection({message: err.message})))
        );
    })
  );

}
