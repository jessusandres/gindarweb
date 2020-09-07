import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {UserModel, UserRegisterModel} from '../models/user.model';
import {BASE_URL} from '../config/config';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

declare function jQuery(s: string): any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(email: string, password: string): Observable<UserModel> {

    const body = {
      email,
      password,
    };

    return this.httpClient.post(`${BASE_URL}/api/auth/login`, body).pipe(
      map(({user}: any) => {
        // console.log(user);
        jQuery('#loginModal').modal('hide');
        this.saveToken(user.token);
        return new UserModel(user.name, user.lastname, user.email, user.password, user.token, user.id);
      })
    );

  }

  saveToken(token: string): void {
    localStorage.setItem('gindar_jwt', token);
  }

  removeToken(): void {
    localStorage.removeItem('gindar_jwt');
    this.router.navigate(['/']);
  }

  private expirated(dateExp: number): boolean {
    const currentDate = new Date().getTime() / 1000;
    // console.log(dateExp);
    // console.log((dateExp - currentDate) / 60);
    return ((dateExp - currentDate) < 1200);
  }


  verifyLogin(): Observable<UserModel | string> {

    const token = localStorage.getItem('gindar_jwt');
    console.log('called');
    if (token) {

      try {
        const payload: any = jwt_decode(token);

        const isExp = this.expirated(payload.exp);
        if (isExp) {
          console.log('refresh token');
          return this.httpClient.post(`${BASE_URL}/api/auth/refreshToken`, {token}).pipe(
            map(({user}: any) => {
              this.saveToken(user.token);
              return user;
            }),
            catchError((err) => {
              return of(err);
            })
          );

        } else {
          return this.httpClient.post(`${BASE_URL}/api/auth/validateToken`, {token}).pipe(
            map(({data}: any) => {
              console.log(data);
              // this.saveToken(user.token);
              return data;
            }),
            catchError((err) => {
              this.router.navigate(['/']);
              return of(err);
            })
          );
        }

      } catch (err) {
        return new Observable<string>(subscriber => {
          this.router.navigate(['/']).then(() => {
            subscriber.error('bad token');
          });
        });
      }


    } else {
      return new Observable<string>(subscriber => {
        this.router.navigate(['/']).then(() => {
          subscriber.error('No token');
        });
      });
    }
  }

  register(userRegisterModel: UserRegisterModel): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/api/auth/register`, {...userRegisterModel}).pipe(
      map(({user}: any) => {
        this.saveToken(user.token);
        this.router.navigate(['/']);
        return new UserModel(user.name, user.lastname, user.email, user.password, user.token, user.id);
      })
    );
  }
}
