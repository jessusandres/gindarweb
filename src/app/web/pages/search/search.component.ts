import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {ShowCaseState} from '../../store/reducers/showcase.reducer';
import {SetFilteredItemsAction, SetQueryAction} from '../../store/actions/showcase.actions';
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
  errorMessage: string;

  query: string;
  showFilter: boolean;
  filteredItems: ItemInterface[];

  querySubscription: Subscription;
  showCaseSubscription: Subscription;
  itemsSubscription: Subscription;
  itemSubscription: Subscription;


  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.querySubscription = this.activatedRoute.params.subscribe((params: Params) => {
      if (this.query !== params.query) {
        this.store.dispatch(new SetQueryAction({query: params.query}));
      }
    });

    this.showCaseSubscription = this.store.select('showcaseState').subscribe((showcaseState: ShowCaseState) => {

      if (this.query !== showcaseState.query) {
        this.query = showcaseState.query;
        this.store.dispatch(new LoadItemsByQueryAction({text: this.query}));
      }
      this.showFilter = showcaseState.showFilter;
      this.filteredItems = showcaseState.filteredItems;
    });

    this.itemsSubscription = this.store.select('itemsState').subscribe((itemsState: ItemsState) => {
      this.items = itemsState.items;
      this.loading = itemsState.isLoading;
      this.errorMessage = itemsState.errorMessage;
    });

    this.itemSubscription = this.store.select('itemsState', 'items').subscribe((items) => {
      if (!this.loading) {
        this.store.dispatch(new SetFilteredItemsAction({items}));
      }
    });


  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
    this.showCaseSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
  }

}
