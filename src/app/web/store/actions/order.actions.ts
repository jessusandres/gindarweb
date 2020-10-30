import {Action} from '@ngrx/store';
import {OrderInterface, OrderParamsInterface} from '../../interfaces/order.interface';
import {VisaSessionInterface} from '../../interfaces/visa-session.interface';

export enum OrderTypes {
  GENERATE_TOKEN = '[ORDER] GENERATE TOKEN',
  GENERATE_TOKEN_SUCCESS = '[ORDER] GENERATE TOKEN SUCCESS',
  GENERATE_TOKEN_FAILURE = '[ORDER] GENERATE TOKEN FAILURE',
  SWITCH_ORDER = '[ORDER] SWITCH ORDER',
  SEND_ORDER = '[ORDER] SEND ORDER',
  SEND_ORDER_SUCESS = '[ORDER] SEND ORDER SUCCESS',
  SEND_ORDER_FAILURE = '[ORDER] SEND ORDER FAILURE',
  RESET_ORDER = '[ORDER] RESET ORDER',
  GENERATE_VISA_SESSION = '[ORDER] GENERATE VISA SESSION',
  GENERATE_VISA_SESSION_SUCCESS = '[ORDER] GENERATE VISA SESSION SUCCESS',
  GENERATE_VISA_SESSION_FAILURE = '[ORDER] GENERATE VISA SESSION FAILURE',
}

export class GenerateTokenAction implements Action {
  readonly type = OrderTypes.GENERATE_TOKEN;
}

export class GenerateTokenSuccessAction implements Action {
  readonly type = OrderTypes.GENERATE_TOKEN_SUCCESS;

  constructor(public payload: { params: OrderParamsInterface }) {
  }
}

export class GenerateTokenFailureAction implements Action {
  readonly type = OrderTypes.GENERATE_TOKEN_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class SwitchOrderAction implements Action {
  readonly type = OrderTypes.SWITCH_ORDER;

  constructor(public payload: { orderParams: OrderParamsInterface }) {
  }
}

export class GenerateOrderAction implements Action {
  readonly type = OrderTypes.SEND_ORDER;

  constructor(public payload: { orderParams: OrderParamsInterface, type: number }) {
  }
}

export class GenerateOrderSuccessAction implements Action {
  readonly type = OrderTypes.SEND_ORDER_SUCESS;

  constructor(public payload: { order: OrderInterface }) {
  }
}

export class GenerateOrderFailureAction implements Action {
  readonly type = OrderTypes.SEND_ORDER_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class ResetOrderAction implements Action {
  readonly type = OrderTypes.RESET_ORDER;
}

export class GenerateVisaSessionAction implements Action {
  readonly type = OrderTypes.GENERATE_VISA_SESSION;

  constructor(public payload: { total: number }) {
  }

}

export class GenerateVisaSessionSuccessAction implements Action {
  readonly type = OrderTypes.GENERATE_VISA_SESSION_SUCCESS;

  constructor(public payload: { visaSession: VisaSessionInterface }) {
  }
}

export class GenerateVisaSessionFailurection implements Action {
  readonly type = OrderTypes.GENERATE_VISA_SESSION_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export type OrderActions = GenerateTokenAction |
  GenerateTokenSuccessAction |
  GenerateTokenFailureAction |
  SwitchOrderAction |
  GenerateOrderAction |
  GenerateOrderSuccessAction |
  GenerateOrderFailureAction |
  ResetOrderAction |
  GenerateVisaSessionAction |
  GenerateVisaSessionSuccessAction |
  GenerateVisaSessionFailurection;
