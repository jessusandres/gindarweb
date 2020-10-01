import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, concat, forkJoin, merge, Observable, zip} from 'rxjs';
import {ItemInterface} from '../interfaces/item.interface';
import {BASE_URL} from '../../config/config';
import {combineAll, concatAll, map} from 'rxjs/operators';
import {ImageInterface} from '../interfaces/image.interface';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {ShowCaseState} from "../store/reducers/showcase.reducer";
import {SetTotalFilterItemsAction} from "../store/actions/showcase.actions";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private page: number;

  constructor(public httpClient: HttpClient, private store: Store<AppState>) {

    this.store.select('showcaseState').subscribe((showCaseState: ShowCaseState) => {
      this.page = showCaseState.page;
    })
  }

  getItemsForQuery(query: string): Observable<ItemInterface[]> {
    return this.httpClient.get(`${BASE_URL}/search/${query}`)
      .pipe(
        map((res: any) => res.items)
      );
  }

  getReleaseItems(): Observable<ItemInterface[]> {
    return this.httpClient.get(`${BASE_URL}/releases`)
      .pipe(
        map((res: any) => res.items)
      );
  }

  getPromotionalItems(): Observable<ItemInterface[]> {
    return this.httpClient.get(`${BASE_URL}/promotionals`)
      .pipe(
        map((res: any) => res.items)
      );
  }

  getItemsForSubline(subline: string): Observable<ItemInterface[]> {
    console.log(this.page)
    return this.httpClient.get(`${BASE_URL}/items/filter/${subline}?page=${(this.page)}`)
      .pipe(
        map((res: any) => {
          this.store.dispatch(new SetTotalFilterItemsAction({amount: res.pages}));
          return res.items
        })
      );
  }

  getItemImages(ruc: string, itemcode: string): Observable<ImageInterface[]> {
    return this.httpClient.get(`${BASE_URL}/item/${ruc}/${itemcode}/images`)
      .pipe(
        map((res: any) => res.images)
      );
  }

  getItem(ruc: string, itemcode: any): Observable<ItemInterface> {
    return this.httpClient.get(`${BASE_URL}/item/${ruc}/${itemcode}`)
      .pipe(
        map((res: any) => res.item)
      );
  }

  getItemDetail(ruc: string, code: string): Observable<any> {
    return zip(this.getItem(ruc, code), this.getItemImages(ruc, code));
  }
}
