import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ItemInterface} from '../interfaces/item.interface';
import {ItemModel} from '../models/item.model';
import {BASE_URL} from '../../config/config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpClient: HttpClient) {
  }

  getItemsForQuery(query: string): Observable<ItemInterface[]> {
    console.log(query);
    return this.httpClient.get(`${BASE_URL}/search/${query}`)
      .pipe(
        map((res: any) => res.items)
      );
  }

}
