import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AdminLoginAction} from '../../store/actions/admin-auth.actions';
import {AdminLogUserInterface} from '../../interfaces/admin-user.interface';
import {AppAuthAdminState} from '../../store/reducers/admin-auth.reducer';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: [
    './admin-login.component.css',
  ]
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm: FormGroup;
  errorMessage: string = null;
  loading: boolean;

  constructor(private router: Router, private readonly store: Store<AppAuthAdminState>) {
  }

  ngOnInit(): void {
    this.adminLoginForm = new FormGroup({
      nickname: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.store.select('adminAuthState').subscribe((adminAuthState) => {
      this.loading = adminAuthState.isLoading;
      this.errorMessage = adminAuthState.authErrorMessage;
    });
  }

  login(): void {

    if (this.adminLoginForm.invalid) {
      this.errorMessage = 'Por favor ingrese datos válidos.';
      return;
    }
    this.errorMessage = null;

    const user: AdminLogUserInterface = {
      password: this.adminLoginForm.controls.password.value.toString(),
      nick: this.adminLoginForm.controls.nickname.value.toString()
    };

    this.store.dispatch(new AdminLoginAction({user}));
  }
}
