import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, zip} from 'rxjs';
import {ItemInterface} from '../interfaces/item.interface';
import {BASE_URL} from '../../config/config';
import {map} from 'rxjs/operators';
import {ImageInterface} from '../interfaces/image.interface';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {ShowCaseState} from "../store/reducers/showcase.reducer";
import {SetTotalFilterItemsAction, SetTotalQueryPageAction} from "../store/actions/showcase.actions";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private filterPage: number;
  private queryPage: number;

  constructor(public httpClient: HttpClient) {
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
