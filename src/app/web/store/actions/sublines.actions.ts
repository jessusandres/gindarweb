import {Action} from '@ngrx/store';
import {SublineInterface} from '../../interfaces/subline.interface';

export enum SubLineTypes {
  LOAD_SUBLINES = '[LINES] LOAD SUBLINES',
  LOAD_SUBLINES_SUCCESS = '[LINES] LOAD SUBLINES SUCCESS',
  LOAD_SUBLINES_FAILURE = '[LINES] LOAD SUBLINES FAILURE',
}


export class LoadSubLinesAction implements Action {
  readonly type = SubLineTypes.LOAD_SUBLINES;
}

export class LoadSubLinesSuccessAction implements Action {
  readonly type = SubLineTypes.LOAD_SUBLINES_SUCCESS;

  constructor(public payload: { sublines: SublineInterface[] }) {
  }
}

export class LoadSubLinesFailureAction implements Action {
  readonly type = SubLineTypes.LOAD_SUBLINES_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export type SubLinesActions = LoadSubLinesAction | LoadSubLinesSuccessAction | LoadSubLinesFailureAction;
