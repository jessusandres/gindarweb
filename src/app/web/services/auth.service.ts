import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BASE_URL} from '../../config/config';
import {UserModel, UserRegisterModel} from '../models/user.model';
import {WebDataService} from './web-data.service';

declare function jQuery(s: string): any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpClient: HttpClient,
              private router: Router,
              private readonly dataService: WebDataService) {
  }

  login(email: string, password: string): Observable<UserModel> {

    const body = this.dataService.setBodyFromObject({
      email,
      password,
    });

    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded");

    return this.httpClient.post(`${BASE_URL}/auth/login`, body, {
      headers
    }).pipe(
      map(({user}: any) => {
        jQuery('#loginModal').modal('hide');
        this.saveToken(user.token);
        return new UserModel(user.name, user.lastname, user.email, user.password, user.token, user.id);
      })
    );

  }

  saveToken(token: string): void {
    this.dataService.saveToken(token);
  }

  removeToken(): void {
    this.dataService.removeToken();
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/']);
  }

  private expirated(dateExp: number): boolean {
    const currentDate = new Date().getTime() / 1000;
    return ((dateExp - currentDate) < 1200);
  }


  verifyLogin(redirect: boolean): Observable<UserModel | string> {

    const token = this.dataService.getToken();
    if (token) {
      try {

        const body = this.dataService.setBodyFromObject({token});

        const payload = JSON.parse(atob(token.split('.')[1]));

        const isExp = this.expirated(payload.exp);
        if (isExp) {


          return this.httpClient.post(`${BASE_URL}/auth/refreshToken`, body).pipe(
            map(({user}: any) => {
              this.saveToken(user.token);
              return user;
            }),
            catchError((err) => {
              if (redirect) {
                this.router.navigate(['/']);
              }
              return of(err);
            })
          );

        } else {

          return this.httpClient.post(`${BASE_URL}/auth/validateToken`, body).pipe(
            map(({data}: any) => data),
            catchError((err) => {
              if (redirect) {
                this.router.navigate(['/']);
              }
              return of(err);
            })
          );
        }

      } catch (err) {
        return new Observable<string>(subscriber => {
          if (redirect) {
            this.router.navigate(['/']);
          }
          subscriber.error('Invalid token');
        });
      }

    } else {
      return new Observable<string>(subscriber => {
        if (redirect) {
          this.router.navigate(['/']);
        }
        subscriber.error('No token');
      });
    }
  }

  register(userRegisterModel: UserRegisterModel): Observable<any> {
    const body = this.dataService.setBodyFromObject({...userRegisterModel});

    return this.httpClient.post(`${BASE_URL}/auth/register`, body).pipe(
      map(({user}: any) => {
        this.saveToken(user.token);
        this.router.navigate(['/']);
        return new UserModel(user.name, user.lastname, user.email, user.password, user.token, user.id);
      })
    );
  }
}
