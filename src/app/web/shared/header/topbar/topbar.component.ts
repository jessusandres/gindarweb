import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import { Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthState} from '../../../store/reducers/auth.reducer';
import {AppState} from '../../../store/app.reducer';
import {UiState} from '../../../store/reducers/ui.reducer';
import {ShowCaseState} from '../../../store/reducers/showcase.reducer';
import {CartState} from '../../../store/reducers/cart.reducer';
import {LogoutAction, ResetStatusAction} from '../../../store/actions/auth.actions';
import {WebDataService} from '../../../services/web-data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: []
})
export class TopbarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  isExpanded: boolean;

  query: string;

  cartAmount: number;

  // StoreSubscriptions
  uiSubscription: Subscription;
  authSubscription: Subscription;
  showcaseSubscription: Subscription;
  cartSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private router: Router,
              private dataService: WebDataService) {
  }

  ngOnInit(): void {

    this.authSubscription = this.store.select('authState').subscribe(
      (data: AuthState) => {
        this.isAuthenticated = data.isAuthenticated;
      }
    );

    this.cartSubscription = this.store.select('cartState').subscribe((cartState: CartState) => {
      this.cartAmount = (!this.isAuthenticated) ? this.dataService.getLocalCart().length : cartState.amount;
    });

    this.uiSubscription = this.store.select('uiState').subscribe(
      (data: UiState) => {
        this.isExpanded = data.isExpanded;
        // console.log('ex:', this.isExpanded);
      }
    );

    this.showcaseSubscription = this.store.select('showcaseState').subscribe((showcaseState: ShowCaseState) => {
      this.query = showcaseState.query;
    });

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.uiSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
    this.showcaseSubscription.unsubscribe();
  }

  search(query: string): void {
    if (query.trim().length < 4) {
      return;
    }
    query = query.trim();
    this.router.navigate([`vitrina/buscar/${query}`]);
  }

  logout(): void {
    this.store.dispatch(new LogoutAction());
  }

  resetAuthForm(): void {
    this.store.dispatch(new ResetStatusAction());
  }
}
