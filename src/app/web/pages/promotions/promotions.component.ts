import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {ItemsState} from '../../store/reducers/items.reducer';
import {ItemInterface} from '../../interfaces/item.interface';
import {LoadPromotionalItemsAction} from '../../store/actions/items.actions';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styles: []
})
export class PromotionsComponent implements OnInit, OnDestroy {
  promotionalItems: ItemInterface[];
  loading: boolean;
  errorMessage: string;

  storeSubs: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.storeSubs = this.store.select('itemsState').subscribe((itemsState: ItemsState) => {
      // console.log(itemsState);
      this.promotionalItems = itemsState.promotionalItems;
      this.loading = itemsState.promotionalLoading;
      this.errorMessage = itemsState.promotionalErrorMessage;
    });
    if (!this.loading && this.promotionalItems.length === 0) {
      this.store.dispatch(new LoadPromotionalItemsAction());
    }
  }

  ngOnDestroy(): void {
    this.storeSubs.unsubscribe();
  }

}
