import {AfterViewInit, Component, OnInit} from '@angular/core';
import {filter, map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, ActivationEnd, Router} from '@angular/router';
import {StatusLoginAction} from './store/actions/auth.actions';
import {
  LoadAdvertisementsAction,
  LoadCarrouselAction, LoadCoverSquaresMenuAction,
  LoadGenderMenuAction,
  LoadInvictaMenuAction,
  SetPageAction
} from './store/actions/ui.actions';
import {HomeComponent} from './pages/home/home.component';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.reducer';
import {LoadPromotionalItemsAction, LoadReleaseItemsAction} from './store/actions/items.actions';
import {LoadBrandsAction} from './store/actions/brands.actions';
import {LoadSubLinesAction} from './store/actions/sublines.actions';

declare function restPlugins(): any;

declare function mdbMinPlugin(): any;

declare function WOW(): any;

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit, AfterViewInit {
  private linkTheme = document.querySelector('#adminHref');

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.linkTheme.removeAttribute('href');

    this.store.dispatch(new StatusLoginAction());
    this.store.dispatch(new LoadAdvertisementsAction());
    this.store.dispatch(new LoadInvictaMenuAction());
    this.store.dispatch(new LoadGenderMenuAction());
    this.store.dispatch(new LoadCarrouselAction());
    this.store.dispatch(new LoadCoverSquaresMenuAction());

    mdbMinPlugin();
    WOW().init();

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

        if (activatedRouteSnapshot.routeConfig.canActivate === undefined) {
          this.store.dispatch(new StatusLoginAction());
        }

        this.store.dispatch(new SetPageAction({
          page: activatedRouteSnapshot.url.join('/'),
          isExpanded: (activatedRouteSnapshot.component === HomeComponent)
        }));

      });

    this.store.dispatch(new LoadPromotionalItemsAction());
    this.store.dispatch(new LoadReleaseItemsAction());
    this.store.dispatch(new LoadBrandsAction());
    this.store.dispatch(new LoadSubLinesAction());
  }

  ngAfterViewInit(): void {
    restPlugins();
  }

}
