import {AfterViewInit, Component, OnInit} from '@angular/core';
import {filter, map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, ActivationEnd, Router} from '@angular/router';
import {StatusLoginAction} from './store/actions/auth.actions';
import {SetPageAction} from './store/actions/ui.actions';
import {HomeComponent} from './pages/home/home.component';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.reducer';

declare function restPlugins(): any;

declare function mdbMinPlugin(): any;

declare function WOW(): any;

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit, AfterViewInit {

  constructor(private store: Store<AppState>, private router: Router) {
    // console.log(router);
    // console.log('web component');
  }

  ngOnInit(): void {
    console.log('mweb init');
    this.store.dispatch(new StatusLoginAction({redirect: false}));
    mdbMinPlugin();
    WOW().init();

    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild == null),
        map((event: ActivationEnd) => event.snapshot)
      )
      .subscribe((activatedRouteSnapshot: ActivatedRouteSnapshot) => {
        console.log('mnsb');
        mdbMinPlugin();
        if (activatedRouteSnapshot.data.reload) {
          WOW().init();
        }

        if (activatedRouteSnapshot.routeConfig.canActivate === undefined) {
          this.store.dispatch(new StatusLoginAction({redirect: false}));
        }

        this.store.dispatch(new SetPageAction({
          page: activatedRouteSnapshot.url.join('/'),
          isExpanded: (activatedRouteSnapshot.component === HomeComponent)
        }));

      });
  }

  ngAfterViewInit(): void {
    restPlugins();
  }

}
