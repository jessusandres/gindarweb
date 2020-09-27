import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {ItemInterface} from '../../interfaces/item.interface';
import {ItemsState} from '../../store/reducers/items.reducer';
import {LoadReleaseItemsAction} from '../../store/actions/items.actions';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styles: []
})
export class ReleasesComponent implements OnInit, OnDestroy {
  releaseItems: ItemInterface[];
  loading: boolean;
  errorMessage: string;

  storeSubs: Subscription;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.storeSubs = this.store.select('itemsState').subscribe((itemsState: ItemsState) => {
      this.releaseItems = itemsState.releaseItems;
      this.loading = itemsState.releaseLoading;
      this.errorMessage = itemsState.releaseErrorMessage;
      console.log(this.releaseItems);
    });
    if (!this.loading && this.releaseItems.length === 0) {
      this.store.dispatch(new LoadReleaseItemsAction());
    }
  }

  ngOnDestroy(): void {
    this.storeSubs.unsubscribe();
  }

}
