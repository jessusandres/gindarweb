import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {BASE_URL} from '../config/config';

declare function jQuery(s: string): any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  login(name: string, password: string): Observable<UserModel> {

    const body = {
      email: name,
      password,
    };

    return this.httpClient.get(`${BASE_URL}/api/example`).pipe(
      map((res: any) => {
        // console.log(res);
        jQuery('#loginModal').modal('hide');
        this.saveToken(res.token);
        return new UserModel('Andres', 'andrew@redmovil.com', '***', res.token, '00001');
      })
    );

  }

  saveToken(token: JSON): void {
    localStorage.setItem('gindar_jwt', JSON.stringify(token));
  }

}
