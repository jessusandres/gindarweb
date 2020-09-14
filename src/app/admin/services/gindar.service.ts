import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../../config/config';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {GindarInfoInterface} from '../interfaces/gindar-info.interface';
import {AuthDataService} from './auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class GindarService {

  constructor(private httpClient: HttpClient, private dataService: AuthDataService) {
  }

  getStoreInfo(): Observable<GindarInfoInterface> {
    return this.httpClient.get(`${BASE_URL}/admin/store/info`, {headers: this.dataService.headers()})
      .pipe(
        map((res: any) => res.info)
      );
  }

  updateStoreInfo(newInfo: GindarInfoInterface): Observable<GindarInfoInterface> {
    return this.httpClient.put(`${BASE_URL}/admin/store/info`, {...newInfo},
      {headers: this.dataService.headers()})
      .pipe(
        map((res: any) => res.info)
      );
  }

}
