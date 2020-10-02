import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../../config/config';
import {map} from 'rxjs/operators';
import {combineLatest, Observable, zip} from 'rxjs';
import {CartInterface} from '../interfaces/cart_item.interface';
import {WebDataService} from './web-data.service';
import {ItemModel} from '../models/item.model';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {UserModel} from '../models/user.model';
import {SetStoreCartAction} from '../store/actions/cart.actions';
import {WebRuc} from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  user: UserModel;

  constructor(public httpClient: HttpClient,
              public dataService: WebDataService,
              public store: Store<AppState>) {
    this.store.select('authState').subscribe((authState) => {
      this.user = authState.user;
    });
  }

  getCart(): Observable<{
    gcart: CartInterface[],
    rcart: CartInterface[],
    ocart: CartInterface[], total: number, amount: number
  }> {

    return this.httpClient.get(`${BASE_URL}/cart/${this.user.id}`, {
      headers: this.dataService.headers(),
    })
      .pipe(
        map((res: {
          gCart: CartInterface[],
          rCart: CartInterface[],
          oCart: CartInterface[], total: number, amount: number
        }) => {

          if (res.gCart.length > 0) {
            this.store.dispatch(new SetStoreCartAction({ruc: res.gCart[0].storeRuc, name: res.gCart[0].storeName}));
          } else if (res.rCart.length > 0) {
            this.store.dispatch(new SetStoreCartAction({ruc: res.rCart[0].storeRuc, name: res.rCart[0].storeName}));
          } else if (res.oCart.length > 0) {
            this.store.dispatch(new SetStoreCartAction({ruc: '00000000000', name: 'Otros'}));
          }

          return {
            gcart: res.gCart,
            rcart: res.rCart,
            ocart: res.oCart,
            total: res.total,
            amount: res.amount,
          };
        })
      );
  }

  addItemCart(item: ItemModel, amount: number): Observable<string> {

    const payload = this.dataService.setBodyFromObject({
      amount,
      code: item.code
    });

    if (!this.user) {
      return;
    }

    return this.httpClient.post(`${BASE_URL}/cart/${this.user.id}/${item.ruc.slice(0, 2)}`,
      payload, {headers: this.dataService.headers()})
      .pipe(
        map(() => `Item agregado al carrito`)
      );
  }


  addLocalItem(item: ItemModel, amount: number): Observable<string> {

    return new Observable(subscriber => {

      const localItems = this.dataService.getLocalCart();

      let exits = false;
      let message = 'Item Agregado';

      localItems.forEach((litem: any) => {
        if (litem.code === item.code) {
          litem.amount += amount;
          message = 'Item actualizado';
          exits = true;
        }
      });

      if (!exits) {
        localItems.push({
          prefix: item.ruc.slice(0, 2),
          code: item.code,
          amount
        });
      }

      this.dataService.setCart(localItems);

      setTimeout(() => {
        subscriber.next(message);
      }, 500);
    });

  }

  updateItemCart(item: ItemModel, amount: number): Observable<string> {

    if (!this.user) {
      return;
    }

    const payload = this.dataService.setBodyFromObject({
      amount,
      code: item.code
    });

    return this.httpClient.put(`${BASE_URL}/cart/${this.user.id}/${item.ruc.slice(0, 2)}`,
      payload, {headers: this.dataService.headers()})
      .pipe(
        map((res) => {
          return `Item actualizado en el carrito`;
        })
      );
  }

  removeItem(item: CartInterface): Observable<any> {
    if (!this.user) {
      return;
    }
    return this.httpClient.delete(`${BASE_URL}/cart/${this.user.id}/${item.code}`, {
      headers: this.dataService.headers()
    })
      .pipe(
        map((res: any) => res.message)
      );
  }

  syncCart(): Observable<any> {

    const items = this.dataService.getLocalCart();
    this.dataService.dropCart();

    const observables: Observable<any>[] = [];
    if (items.length > 0) {

      items.forEach((item) => {

        if (item.prefix === '10' || item.prefix === '20') {
          const model: any = {
            code: item.code,
            ruc: (item.prefix === '10') ? WebRuc.ROGER : WebRuc.GINDAR
          };

          observables.push(this.addItemCart(model, item.amount));
        }


      });
      return combineLatest(observables);
    } else {
      return new Observable<any>();
    }

  }
}
