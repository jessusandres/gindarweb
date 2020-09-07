import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NUMBER_REGEX} from '../../config/config';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {RegisterAction} from '../../store/actions/auth.actions';
import {UserRegisterModel} from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = null;
  loading: boolean;

  authSubscription: Subscription;

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.authSubscription = this.store.select('authState').subscribe((authState) => {
      this.loading = authState.isLoading;
      this.errorMessage = authState.errorMessage;
    });


    this.registerForm = new FormGroup({
      documentOI: new FormControl(null, [Validators.minLength(8), Validators.required, Validators.pattern(NUMBER_REGEX)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(9),
        Validators.pattern(NUMBER_REGEX)]),
      address: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      passwordr: new FormControl(null, [Validators.required])
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
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.errorMessage = 'Datos de registro incorrectos';
      return;
    }
    this.errorMessage = null;
    console.log(this.registerForm);
    const user: UserRegisterModel = new UserRegisterModel(
      this.registerForm.controls.name.value.toString(),
      this.registerForm.controls.lastname.value.toString(),
      this.registerForm.controls.email.value.toString(),
      this.registerForm.controls.password.value.toString(),
      this.registerForm.controls.phone.value.toString(),
      this.registerForm.controls.address.value.toString(),
      this.registerForm.controls.documentOI.value.toString(),
    );
    this.store.dispatch(new RegisterAction({user}));
  }
}
