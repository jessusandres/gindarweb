import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {AuthState} from '../../../store/reducers/auth.reducer';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UiState} from '../../../store/reducers/ui.reducer';
import {ShowCaseState} from '../../../store/reducers/showcase.reducer';
import {LogoutAction} from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: []
})
export class TopbarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  isExpanded: boolean;

  query: string;

  // StoreSubscriptions
  uiSubscription: Subscription;
  authSubscription: Subscription;
  showcaseSubscription: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
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

    this.showcaseSubscription = this.store.select('showcaseState').subscribe((showcaseState: ShowCaseState) => {
      this.query = showcaseState.query;
    });

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.uiSubscription.unsubscribe();
  }

  search(query: string): void {
    console.log(query);
    this.router.navigate([`vitrina/buscar/${query}`]);
  }

  logout(): void {
    this.store.dispatch(new LogoutAction());
  }
}
