import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '../../config/config';
import {map} from 'rxjs/operators';
import {AdvertisementItem, SliderItem} from '../interfaces/ui.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GenericDataService {

  constructor(public httpClient: HttpClient) {
  }

  getAdvertisements(): Observable<AdvertisementItem[]> {
    return this.httpClient.get(`${BASE_URL}/advertisements`)
      .pipe(
        map((res: any) => res.advertisements)
      );
  }

  getSliders(): Observable<SliderItem[]> {
    return this.httpClient.get(`${BASE_URL}/sliders`)
      .pipe(
        map((res: any) => res.sliders)
      );
  }

  getInvictaMenu(): Observable<any[]> {
    return this.httpClient.get(`${BASE_URL}/invictamenu`)
      .pipe(
        map((res: any) => res.menu)
      );
  }
}
