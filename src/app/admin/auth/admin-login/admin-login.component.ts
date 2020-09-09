import {Component, OnInit} from '@angular/core';
import {AdminStyles} from '../../environments/admin.environments';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: AdminStyles
})
export class AdminLoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
