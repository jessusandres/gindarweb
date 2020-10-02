import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '../../config/config';
import {map} from 'rxjs/operators';
import {AdvertisementItem, SliderItem, WebPhones} from '../interfaces/ui.interfaces';
import {GenderMenuInterface} from "../interfaces/gender-menu.interface";
import {CoverSquareInterface} from "../interfaces/cover-squares.interface";
import {GindarInfoInterface} from "../../admin/interfaces/gindar-info.interface";

@Injectable({
  providedIn: 'root'
})
export class GenericDataService {

  constructor(public httpClient: HttpClient) {
  }

  getStoreInfo(): Observable<GindarInfoInterface> {
    return this.httpClient.get(`${BASE_URL}/info`)
      .pipe(
        map((res: any) => res.info)
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

  getGenderMenu(): Observable<GenderMenuInterface> {
    return this.httpClient.get(`${BASE_URL}/gendermenus`)
      .pipe(
        map((res: any) => res.menus)
      );
  }

  getCoverSquares(): Observable<CoverSquareInterface[]> {
    return this.httpClient.get(`${BASE_URL}/coversquares`)
      .pipe(
        map((res: any) => res.squares)
      );
  }

  getWebPhones(): Observable<WebPhones> {
    return this.httpClient.get(`${BASE_URL}/webphones`)
      .pipe(
        map((res: any) => res.phones)
      );
  }
}
