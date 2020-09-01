import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {AuthState} from '../../../store/reducers/auth.reducer';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: [
  ]
})
export class TopbarComponent implements OnInit {

  isAuthenticated: boolean;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('authState').subscribe(
      (data: AuthState) => {
        this.isAuthenticated = data.isAuthenticated;
      }
    );

  }

}
