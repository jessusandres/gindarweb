import {Component, OnInit} from '@angular/core';
import {AdminStyles} from '../../environments/admin.environments';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: AdminStyles
})
export class AdminRegisterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
