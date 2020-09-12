import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {AdminRegisterAction} from '../../store/actions/admin-auth.actions';
import {AdminUserInterface} from '../../interfaces/admin-user.interface';
import {AppAuthAdminState} from '../../store/reducers/admin-auth.reducer';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: []
})
export class AdminRegisterComponent implements OnInit {

  errorMessage: string;
  isLoading: boolean;

  storeSubs: Subscription;
  registerForm: FormGroup;

  constructor(private store: Store<AppAuthAdminState>) {
  }

  ngOnInit(): void {

    this.storeSubs = this.store.select('adminAuthState').subscribe((adminAuthState) => {
      this.isLoading = adminAuthState.isLoading;
      this.errorMessage = adminAuthState.registerErrorMessage;
      if (!adminAuthState.isLoading && adminAuthState.registerErrorMessage === null) {
        this.registerForm?.reset();
      }
    });

    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      nickname: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      passwordr: new FormControl(null, [Validators.required]),
    }, {
      validators: this.verifyPassword('password', 'passwordr')
    });
  }

  verifyPassword(pass1: string, pass2: string): any {
    return (group: FormGroup) => {

      const vpass1 = group.controls[pass1].value;
      const vpass2 = group.controls[pass2].value;

      if (vpass1 === vpass2) {
        return null;
      }

      return {
        passequals: false
      };

    };
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor corrija datos';
      this.registerForm.markAllAsTouched();
      return;
    } else {

      const user: AdminUserInterface = {
        nick: this.registerForm.controls.nickname.value,
        name: this.registerForm.controls.name.value,
        email: '',
        password: this.registerForm.controls.passwordr.value,
      };
      console.log(user);
      this.store.dispatch(new AdminRegisterAction({user}));
    }
  }
}
