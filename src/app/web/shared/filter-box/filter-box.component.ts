import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AllowedOrders,
  HideFilteredItemsAction,
  SetBrandAction,
  SetOrderAction,
  SetSubLineAction
} from '../../store/actions/showcase.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {ShowCaseState} from '../../store/reducers/showcase.reducer';
import {BrandInterface} from '../../interfaces/brand.interface';
import {BrandsState} from '../../store/reducers/brands.reducer';
import {SublineInterface} from '../../interfaces/subline.interface';
import {SubLineState} from '../../store/reducers/sublines.reducer';
import {ItemInterface} from '../../interfaces/item.interface';
import {ItemsState} from '../../store/reducers/items.reducer';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styles: []
})
export class FilterBoxComponent implements OnInit, OnDestroy {

  allowedOrders: AllowedOrders;
  brands: BrandInterface[];
  sublines: SublineInterface[];

  lineSelected: number;
  brandSelected: number;
  orderSelected: AllowedOrders;

  showcaseSubs: Subscription;
  brandSubs: Subscription;
  sublineSubs: Subscription;
  itemSubs: Subscription;

  items: ItemInterface[];
  filteredItems: ItemInterface[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.showcaseSubs = this.store.select('showcaseState').subscribe((showcaseState: ShowCaseState) => {
      this.lineSelected = showcaseState.line;
      this.brandSelected = showcaseState.brandCode;
      this.orderSelected = showcaseState.order;
      this.filteredItems = showcaseState.filteredItems;
    });

    this.brandSubs = this.store.select('brandsState').subscribe((brandState: BrandsState) => {
      this.brands = brandState.brands;
    });

    this.sublineSubs = this.store.select('sublinesState').subscribe((sublinesState: SubLineState) => {
      this.sublines = sublinesState.sublines;
    });

    this.itemSubs = this.store.select('itemsState').subscribe((itemsState: ItemsState) => {
      this.items = itemsState.items;
    });
  }

  ngOnDestroy(): void {
    this.showcaseSubs.unsubscribe();
    this.brandSubs.unsubscribe();
    this.sublineSubs.unsubscribe();
    this.itemSubs.unsubscribe();
  }

  resetFilter(): void {
    this.store.dispatch(new HideFilteredItemsAction({items: this.items}));
  }

  changeOrder({target}): void {
    this.store.dispatch(new SetOrderAction({order: target.value, items: this.filteredItems}));
  }

  changeSubLine({target}): void {
    this.store.dispatch(new SetSubLineAction({sublineCode: target.value, items: this.items}));
  }

  changeBrand({target}): void {
    // console.log(target.value);
    // this.store.dispatch(new FilterChangeBrand({brandCode}))
    // console.log(this.brandSelected);
    this.store.dispatch(new SetBrandAction({brandCode: target.value, items: this.items}));
  }
}
