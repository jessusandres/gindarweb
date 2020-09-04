import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {Subscription} from 'rxjs';
import {LoginAction} from '../../../store/actions/auth.actions';
import {LogUserModel} from '../../../models/user.model';



@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styles: []
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  authSubscription: Subscription;

  // authSubscription
  loading = false;
  errorMessage: string = null;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    this.authSubscription = this.store.select('authState').subscribe(authState => {
      this.errorMessage = authState.errorMessage;
      this.loading = authState.isLoading;
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

    // console.log(this.loginForm.value);
    // console.log(this.loginForm.valid);

    const payload = {
      user: new LogUserModel(this.loginForm.value.name, this.loginForm.value.password)
    };
    // console.log(payload);
    this.store.dispatch(new LoginAction(payload));


  }
}
