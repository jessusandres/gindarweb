import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.reducer';
import {LoginAction} from './store/actions/auth.actions';
import {LogUserModel} from './models/model-actions/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gindarperu';
  email = 'jaccspanki@gmail.com';
  pass = 'promi$e1920';

  constructor(private store: Store<AppState>) {
  }


  login(): void {
    console.log(this.email);
    console.log(this.pass);
    const payload = {
      user: new LogUserModel(this.email, this.pass)
    };
    this.store.dispatch(new LoginAction(payload));
  }
}
