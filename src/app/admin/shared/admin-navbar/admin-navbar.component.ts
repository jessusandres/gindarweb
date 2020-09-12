import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {AdminUserInterface} from '../../interfaces/admin-user.interface';
import {AppAuthAdminState} from '../../store/reducers/admin-auth.reducer';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styles: []
})
export class AdminNavbarComponent implements OnInit {

  user: AdminUserInterface;
  storeSubs: Subscription;

  constructor(private store: Store<AppAuthAdminState>) {
  }

  ngOnInit(): void {
    this.storeSubs = this.store.select('adminAuthState').subscribe((adminAuthState) => {
      console.log(adminAuthState);
      this.user = adminAuthState.user;
    });
  }

}
