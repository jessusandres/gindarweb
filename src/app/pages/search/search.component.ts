import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {ShowCaseState} from '../../store/reducers/showcase.reducer';
import {SetQueryAction} from '../../store/actions/showcase.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit, OnDestroy {
  items = [1, 2];

  querySubscription: Subscription;
  storeSubscription: Subscription;
  query: string;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.querySubscription = this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params.query);
      this.store.dispatch(new SetQueryAction({query: params.query}));
    });

    this.storeSubscription = this.store.select('showcaseState').subscribe((showcaseState: ShowCaseState) => {
      this.query = showcaseState.query;
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

}
