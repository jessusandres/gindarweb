import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {ItemInterface} from '../../interfaces/item.interface';
import {LoadItemsByQueryAction} from '../../store/actions/items.actions';
import {ItemsState} from '../../store/reducers/items.reducer';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

declare function detailPluging(): any;

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styles: []
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  items: ItemInterface[] = [];

  loading: boolean;
  errorMessage: string;

  routerSubs: Subscription;

  constructor(private router: Router,
              private store: Store<AppState>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.routerSubs = this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild == null),
        map((event: ActivationEnd) => event.snapshot)
      )
      .subscribe((activatedRouteSnapshot: ActivatedRouteSnapshot) => {
        // console.log(activatedRouteSnapshot);
        const {query, line} = activatedRouteSnapshot.params;
        if (query) {
          this.store.dispatch(new LoadItemsByQueryAction({text: query}));

        } else {
          console.log('line');
          console.log(line);
        }
      });

    this.store.select('itemsState').subscribe((itemsState: ItemsState) => {
      // console.log(itemsState);
      this.items = itemsState.items;
      this.loading = itemsState.isLoading;
      this.errorMessage = itemsState.errorMessage;
    });
    detailPluging();

    const fquery = this.activatedRoute.snapshot.params.query;
    const fline = this.activatedRoute.snapshot.params.line;

    if (fquery) {
      this.store.dispatch(new LoadItemsByQueryAction({text: fquery}));

    } else {
      console.log('line');
      console.log(fline);
    }

  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

}
