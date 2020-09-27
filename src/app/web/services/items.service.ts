import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, concat, forkJoin, merge, Observable, zip} from 'rxjs';
import {ItemInterface} from '../interfaces/item.interface';
import {BASE_URL} from '../../config/config';
import {combineAll, concatAll, map} from 'rxjs/operators';
import {ImageInterface} from '../interfaces/image.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(public httpClient: HttpClient) {
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

  getItemsForSubline(ruc: string, subline: string): Observable<ItemInterface[]> {
    // console.log(`${BASE_URL}/filter/${ruc}/${subline}`);
    return this.httpClient.get(`${BASE_URL}/filter/${ruc}/${subline}`)
      .pipe(
        map((res: any) => res.items)
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
