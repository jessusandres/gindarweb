import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemInterface} from '../../interfaces/item.interface';
import {ItemsService} from '../../services/items.service';
import {WebRuc} from '../../types/types';
import {ImageInterface} from '../../interfaces/image.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {LoadingItemDetailAction} from '../../store/actions/item.actions';
import {Subscription} from 'rxjs';
import {RemoveItemNameAction, SetItemNameAction} from '../../store/actions/ui.actions';
import {AddCartItemAction} from '../../store/actions/cart.actions';

declare function detailPluging(): any;

declare function $(s: string): any;

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styles: ['button { height: 63%; }']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  currentYear: any;

  item: ItemInterface;
  images: ImageInterface[];
  loading: boolean;
  errorMessage: string;

  cartLoading: boolean;
  cartErrorMessage: string;
  cartMessage: string;

  routeSubs: Subscription;
  itemSubs: Subscription;
  cartSubs: Subscription;
  amount = 1;

  constructor(private itemsService: ItemsService,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.currentYear = new Date().getFullYear();

    const ruc = (this.activatedRoute.snapshot.url[1].path === '10') ? WebRuc.ROGER : WebRuc.GINDAR;

    this.routeSubs = this.activatedRoute.params.subscribe((params) => {
      this.store.dispatch(new LoadingItemDetailAction({ruc, itemCode: params.itemcode}));
    });

    this.itemSubs = this.store.select('itemState').subscribe((itemState) => {
      this.item = itemState.item;
      this.loading = itemState.loading;
      this.images = itemState.images;
      this.errorMessage = itemState.errorMessage;
      if (this.images.length === 0) {
        this.images = [
          {
            image: null,
            ruc: null,
            code: null
          }
        ];
      }
      this.store.dispatch(new SetItemNameAction({itemName: this.item?.shortDescription || this.item?.description}));
      detailPluging();
      setTimeout(() => {
        $('.zoom-img_ms').zoom();
      }, 0);
    });

    this.cartSubs = this.store.select('cartState').subscribe((cartState) => {
      this.cartErrorMessage = cartState.actionErrorMessage;
      this.cartLoading = cartState.actionLoading;
      this.cartMessage = cartState.actionMessage;
    });


  }

  ngOnDestroy(): void {
    this.store.dispatch(new RemoveItemNameAction());
    this.routeSubs.unsubscribe();
    this.itemSubs.unsubscribe();
    this.cartSubs.unsubscribe();
  }

  addItemToCart(): void {
    // console.log(this.amount);
    if (isNaN(this.amount) || this.amount <= 0) {
      this.cartErrorMessage = 'Cantidad incorrecta!';
      return;
    }

    this.cartErrorMessage = null;

    this.store.dispatch(new AddCartItemAction({item: this.item, amount: this.amount}));
  }
}
