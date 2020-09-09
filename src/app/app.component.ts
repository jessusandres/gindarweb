import {AfterViewInit, Component, OnInit} from '@angular/core';
// import {Store} from '@ngrx/store';
// import {AppState} from './web/store/app.reducer';
// import {StatusLoginAction} from './web/store/actions/auth.actions';
// import {ActivatedRouteSnapshot, ActivationEnd, Router} from '@angular/router';
// import {filter, map} from 'rxjs/operators';
// import {HomeComponent} from './web/pages/home/home.component';
// import {SetPageAction} from './web/store/actions/ui.actions';
//
// declare function restPlugins(): any;
//
// declare function mdbMinPlugin(): any;
//
// declare function WOW(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'gindarperu';

  constructor() {
  }

  ngAfterViewInit(): void {
    // restPlugins();
  }

  ngOnInit(): void {

    // this.router.events
    //   .pipe(
    //     filter(event => event instanceof ActivationEnd),
    //     filter((event: ActivationEnd) => event.snapshot.firstChild == null),
    //     map((event: ActivationEnd) => event.snapshot)
    //   )
    //   .subscribe((activatedRouteSnapshot: ActivatedRouteSnapshot) => {
    //     mdbMinPlugin();
    //     if (activatedRouteSnapshot.data.reload) {
    //       WOW().init();
    //     }
    //     if (activatedRouteSnapshot.routeConfig.canActivate === undefined) {
    //       this.store.dispatch(new StatusLoginAction({redirect: false}));
    //     }
    //
    //     this.store.dispatch(new SetPageAction({
    //       page: activatedRouteSnapshot.url.join('/'),
    //       isExpanded: (activatedRouteSnapshot.component === HomeComponent)
    //     }));
    //
    //   });
  }

}
