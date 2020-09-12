import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AdminLogoutAction} from '../../store/actions/admin-auth.actions';
import {AppAuthAdminState} from '../../store/reducers/admin-auth.reducer';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styles: []
})
export class AdminTopbarComponent implements OnInit {

  constructor(private store: Store<AppAuthAdminState>, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.data);
  }

  logout(): void {
    this.store.dispatch(new AdminLogoutAction());

  }
}
