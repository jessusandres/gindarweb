import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../../../store/app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {UiState} from '../../../store/reducers/ui.reducer';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styles: []
})
export class AdvertisementsComponent implements OnInit, OnDestroy {

  advertisements: { title: string }[] = [];

  uiSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.uiSubscription = this.store.select('uiState').subscribe((uiState: UiState) => {
      this.advertisements = uiState.advertisements;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
