import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../../config/config';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CartInterface} from '../interfaces/cart_item.interface';
import {WebDataService} from './web-data.service';
import {ItemModel} from '../models/item.model';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {UserModel} from '../models/user.model';
import {ItemInterface} from '../interfaces/item.interface';

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
      headers: this.dataService.headers()
    })
      .pipe(
        map((res: {
          gCart: CartInterface[],
          rCart: CartInterface[],
          oCart: CartInterface[], total: number, amount: number
        }) => {
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
    const payload = {
      amount,
      code: item.code
    };
    return this.httpClient.post(`${BASE_URL}/cart/${this.user.id}/${item.ruc.slice(0, 2)}`,
      payload, {headers: this.dataService.headers()})
      .pipe(
        map((res) => {
          console.log(res);
          return `Item agregado al carrito`;
        })
      );
  }

  updateItemCart(item: ItemModel, amount: number): Observable<string> {
    const payload = {
      amount,
      code: item.code
    };
    return this.httpClient.put(`${BASE_URL}/cart/${this.user.id}/${item.ruc.slice(0, 2)}`,
      payload, {headers: this.dataService.headers()})
      .pipe(
        map((res) => {
          console.log(res);
          return `Item actualizado en el carrito`;
        })
      );
  }

  removeItem(item: CartInterface): Observable<any> {
    return this.httpClient.delete(`${BASE_URL}/cart/${this.user.id}/${item.code}`, {
      headers: this.dataService.headers()
    })
      .pipe(
        map((res: any) => res.message)
      );
  }
}
