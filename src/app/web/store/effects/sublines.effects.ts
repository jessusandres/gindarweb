import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {GindarService} from '../../../admin/services/gindar.service';
import {LoadSubLinesFailureAction, LoadSubLinesSuccessAction, SubLineTypes} from '../actions/sublines.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {SublineInterface} from '../../interfaces/subline.interface';
import {of} from 'rxjs';


@Injectable()
export class SublinesEffects {
  constructor(private actions$: Actions, private readonly gindarService: GindarService) {
  }

  @Effect()
  loadSublines = this.actions$.pipe(
    ofType(SubLineTypes.LOAD_SUBLINES),
    mergeMap(() => {
      return this.gindarService.getSubLines().pipe(
        map((sublines: SublineInterface[]) => new LoadSubLinesSuccessAction({sublines})),
        catchError((err) => of(new LoadSubLinesFailureAction({message: err.error.message})))
      );
    })
  );
}
