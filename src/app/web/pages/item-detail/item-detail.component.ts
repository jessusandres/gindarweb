import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemInterface} from '../../interfaces/item.interface';
import {ItemService} from '../../services/item.service';
import {WebRuc} from '../../types/types';
import {ImageInterface} from '../../interfaces/image.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {LoadingItemDetailAction} from '../../store/actions/item.actions';
import {Subscription} from 'rxjs';
import {RemoveItemNameAction, SetItemNameAction} from '../../store/actions/ui.actions';
import {AddCartItemAction, AddLocalItemAction} from '../../store/actions/cart.actions';
import {AuthState} from '../../store/reducers/auth.reducer';
import {Meta} from '@angular/platform-browser';

declare function detailPluging(): any;

declare function $(s: string): any;

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styles: ['button { height: 63%; }']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  amount = 1;
  currentYear: any;

  item: ItemInterface;
  images: ImageInterface[];

  isAuth: boolean;
  loading: boolean;
  errorMessage: string;

  cartLoading: boolean;
  cartErrorMessage: string;
  cartMessage: string;

  routeSubs: Subscription;
  itemSubs: Subscription;
  cartSubs: Subscription;
  authSubs: Subscription;

  constructor(private itemsService: ItemService,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
              private meta: Meta) {
  }

  ngOnInit(): void {

    this.meta.updateTag({
      property: 'og:description',
      content: 'Detalle de Producto'
    });

    this.meta.updateTag({
      content: 'Detalle de Producto B'
    }, 'name=Description');

    this.meta.updateTag({
      property: 'og:title',
      content: 'Titulo de Página'
    });

    this.meta.updateTag({
      property: 'og:url',
      content: 'https://gindarperu.com/vitrina/20/detalle/0101160001'
    });

    this.meta.updateTag({
      property: 'og:image',
      content: `https://gindarperu.com/assets/img/img_producto/20605477551010107009028097.jpg`
    });

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
      this.store.dispatch(new SetItemNameAction({itemName: this.item?.description || 'Detalle de Producto'}));

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

    this.authSubs = this.store.select('authState').subscribe((authState: AuthState) => {
      this.isAuth = authState.isAuthenticated;
    });


  }

  ngOnDestroy(): void {
    this.store.dispatch(new RemoveItemNameAction());
    this.routeSubs.unsubscribe();
    this.itemSubs.unsubscribe();
    this.cartSubs.unsubscribe();
  }

  addItemToCart(): void {
    if (isNaN(this.amount) || this.amount <= 0) {
      this.cartErrorMessage = 'Cantidad incorrecta!';
      return;
    }

    this.cartErrorMessage = null;

    if (!this.isAuth) {
      this.store.dispatch(new AddLocalItemAction({item: this.item, amount: this.amount}));
      return;
    }

    this.store.dispatch(new AddCartItemAction({item: this.item, amount: this.amount}));
  }

  changeItemCode({target}): void {
    this.item = {
      ...this.item,
      code: target.value
    };
  }
}
