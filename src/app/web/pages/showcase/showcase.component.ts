import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {ItemInterface} from '../../interfaces/item.interface';
import {LoadItemsByQueryAction, LoadItemsBySubLineAction} from '../../store/actions/items.actions';
import {ItemsState} from '../../store/reducers/items.reducer';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {WebRuc} from '../../types/types';
import {SetFilteredItemsAction} from '../../store/actions/showcase.actions';

declare function detailPluging(): any;

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styles: []
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  items: ItemInterface[] = [];

  showFilter: boolean;
  filteredItems: ItemInterface[] = [];

  loading: boolean;
  errorMessage: string;

  routerSubs: Subscription;
  itemSubs: Subscription;
  itemsSubs: Subscription;
  showcaseSubs: Subscription;

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
          // console.log('already');
          const rucPrefixi = this.activatedRoute.snapshot.url[1].path;
          this.store.dispatch(new LoadItemsBySubLineAction({
            ruc: (rucPrefixi === '10') ? WebRuc.ROGER : WebRuc.GINDAR,
            subline: line,
          }));
        }
      });

    this.itemsSubs = this.store.select('itemsState').subscribe((itemsState: ItemsState) => {
      this.items = itemsState.items;
      this.loading = itemsState.isLoading;
      this.errorMessage = itemsState.errorMessage;
    });

    this.itemSubs = this.store.select('itemsState', 'items').subscribe((items) => {
      if (!this.loading) {
        this.store.dispatch(new SetFilteredItemsAction({items}));
      }
    });

    this.showcaseSubs = this.store.select('showcaseState').subscribe((showcaseState) => {
      this.showFilter = showcaseState.showFilter;
      this.filteredItems = showcaseState.filteredItems;
    });

    detailPluging();

    const rucPrefix = this.activatedRoute.snapshot.url[1].path;
    const fquery = this.activatedRoute.snapshot.params.query;
    const fline = this.activatedRoute.snapshot.params.line;

    if (fquery) {
      this.store.dispatch(new LoadItemsByQueryAction({text: fquery}));

    } else {

      this.store.dispatch(new LoadItemsBySubLineAction({
        ruc: (rucPrefix === '10') ? WebRuc.ROGER : WebRuc.GINDAR,
        subline: fline,
      }));
    }

  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
    this.itemSubs.unsubscribe();
    this.itemsSubs.unsubscribe();
    this.showcaseSubs.unsubscribe();
  }

}
