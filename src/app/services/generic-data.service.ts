import {Injectable} from '@angular/core';
import {BASE_URL} from '../config/config';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericDataService {

  constructor(private httpClient: HttpClient) {
  }

  getAdvertisements(): Observable<any> {
    return this.httpClient.get(`${BASE_URL}/advertisements`)
      .pipe(
        map((response: any) => {
          return response.advertisements;
        })
      );
  }
  getCategories(): Observable<any> {
    return this.httpClient.get(`${BASE_URL}/categories`)
      .pipe(
        map((response: any) => {
          return response.categories;
        })
      );
  }
}
