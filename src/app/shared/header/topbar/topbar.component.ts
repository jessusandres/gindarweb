import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {AuthState} from '../../../store/reducers/auth.reducer';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {UiState} from '../../../store/reducers/ui.reducer';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: []
})
export class TopbarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  isExpanded: boolean;

  // StoreSubscriptions
  uiSubscription: Subscription;
  authSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.authSubscription = this.store.select('authState').subscribe(
      (data: AuthState) => {
        this.isAuthenticated = data.isAuthenticated;
      }
    );

    this.uiSubscription = this.store.select('uiState').subscribe(
      (data: UiState) => {
        this.isExpanded = data.isExpanded;
        // console.log('ex:', this.isExpanded);
      }
    );

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.uiSubscription.unsubscribe();
  }

}
