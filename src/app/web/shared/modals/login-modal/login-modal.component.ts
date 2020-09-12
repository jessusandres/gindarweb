import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {Subscription} from 'rxjs';
import {LoginAction, LoginFailureAction, ResetStatusAction} from '../../../store/actions/auth.actions';
import {LogUserModel} from '../../../models/user.model';
import {EMAIL_REGEX} from '../../../../config/config';

declare function jQuery(s: string): any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styles: []
})
export class LoginModalComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  authSubscription: Subscription;

  // authSubscription
  loading = false;
  errorMessage: string = null;

  constructor(private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetStatusAction());
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.minLength(4),
        Validators.pattern(EMAIL_REGEX),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.authSubscription = this.store.select('authState').subscribe(authState => {
      this.errorMessage = authState.authErrorMessage;
      this.loading = authState.isLoading;
      if (authState.isAuthenticated) {
        this.loginForm.reset();
      }
    });


  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor corrija datos';
      return;
    }
    if (this.loading) {
      return;
    }
    this.errorMessage = null;

    const payload = {
      user: new LogUserModel(this.loginForm.value.email, this.loginForm.value.password)
    };

    this.store.dispatch(new LoginAction(payload));

  }

  goToRegisterPage(): void {

    // this.router.navigate(['register']);
    jQuery('#loginModal').modal('hide');

  }
}
