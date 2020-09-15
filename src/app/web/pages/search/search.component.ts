import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {ShowCaseState} from '../../store/reducers/showcase.reducer';
import {SetQueryAction} from '../../store/actions/showcase.actions';
import {LoadItemsByQueryAction} from '../../store/actions/items.actions';
import {ItemsState} from '../../store/reducers/items.reducer';
import {ItemInterface} from '../../interfaces/item.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit, OnDestroy {

  items: ItemInterface[];
  loading: boolean;

  querySubscription: Subscription;
  showCaseSubscription: Subscription;
  itemsSubscription: Subscription;
  query: string;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.querySubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.store.dispatch(new SetQueryAction({query: params.query}));
    });

    this.showCaseSubscription = this.store.select('showcaseState').subscribe((showcaseState: ShowCaseState) => {
      this.query = showcaseState.query;
    });
    this.itemsSubscription = this.store.select('itemsState').subscribe((itemsState: ItemsState) => {
      this.items = itemsState.items;
      this.loading = itemsState.isLoading;
    });

    this.store.dispatch(new LoadItemsByQueryAction({text: this.query}));
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
    this.showCaseSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }

}
