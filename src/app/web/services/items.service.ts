import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AdvertisementItem} from "../interfaces/ui.interfaces";
import {BASE_URL} from "../../config/config";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ItemInterface} from "../interfaces/item.interface";
import {SetTotalFilterItemsAction, SetTotalQueryPageAction} from "../store/actions/showcase.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {ShowCaseState} from "../store/reducers/showcase.reducer";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private filterPage: number;
  private queryPage: number;

  constructor(public httpClient: HttpClient, private store: Store<AppState>) {

    this.store.select('showcaseState').subscribe((showCaseState: ShowCaseState) => {
      this.filterPage = showCaseState.page;
      this.queryPage = showCaseState.queryPage;
    })
  }

  getAdvertisements(): Observable<AdvertisementItem[]> {
    return this.httpClient.get(`${BASE_URL}/items/advertisements`)
      .pipe(
        map((res: any) => res.advertisements)
      );
  }

  getItemsForQuery(query: string): Observable<ItemInterface[]> {

    return this.httpClient.get(`${BASE_URL}/items/search/${query}?page=${this.queryPage}`)
      .pipe(
        map((res: any) => {
          this.store.dispatch(new SetTotalQueryPageAction({amount: res.pages}));
          return res.items;
        })
      );
  }

  getReleaseItems(): Observable<ItemInterface[]> {
    return this.httpClient.get(`${BASE_URL}/items/releases`)
      .pipe(
        map((res: any) => res.items)
      );
  }

  getPromotionalItems(): Observable<ItemInterface[]> {
    return this.httpClient.get(`${BASE_URL}/items/promotionals`)
      .pipe(
        map((res: any) => res.items)
      );
  }

  getItemsForSubline(subline: string): Observable<ItemInterface[]> {

    return this.httpClient.get(`${BASE_URL}/items/filter/${subline}?page=${(this.filterPage)}`)
      .pipe(
        map((res: any) => {
          this.store.dispatch(new SetTotalFilterItemsAction({amount: res.pages}));
          return res.items
        })
      );
  }
}
