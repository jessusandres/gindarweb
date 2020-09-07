import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.reducer';
import {LoginAction, StatusLoginAction} from './store/actions/auth.actions';
import {LogUserModel} from './models/user.model';
import {ActivatedRouteSnapshot, ActivationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {HomeComponent} from './pages/home/home.component';
import {SetPageAction} from './store/actions/ui.actions';

declare function restPlugins(): any;

declare function mdbMinPlugin(): any;

declare function WOW(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'gindarperu';
  email = 'jaccspanki@gmail.com';
  pass = 'promi$e1920';

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngAfterViewInit(): void {
    restPlugins();
  }

  ngOnInit(): void {

    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild == null),
        map((event: ActivationEnd) => event.snapshot)
      )
      .subscribe((activatedRouteSnapshot: ActivatedRouteSnapshot) => {
        mdbMinPlugin();
        if (activatedRouteSnapshot.data.reload) {
          WOW().init();
        }

        // this.store.dispatch(new StatusLoginAction());

        this.store.dispatch(new SetPageAction({
          page: activatedRouteSnapshot.url.join('/'),
          isExpanded: (activatedRouteSnapshot.component === HomeComponent)
        }));

      });
  }

}
