import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL} from '../../config/config';
import {map} from 'rxjs/operators';
import {AdminUserInterface} from '../interfaces/admin-user.interface';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthDataService} from './auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  errorMessage: string;

  constructor(private readonly httpClient: HttpClient,
              private router: Router,
              private dataService: AuthDataService) {
  }

  login(nick: string, password: string): Observable<AdminUserInterface> {

    return this.httpClient.post(`${BASE_URL}/admin/auth/login`, {nick, password})
      .pipe(
        map((data: any) => {
          this.dataService.saveToken(data.user.token);
          return data.user;
        })
      );

  }


  checkToken(redirect: boolean): boolean {
    if (redirect && this.dataService.getToken()) {
      this.router.navigate(['/admin/dashboard']);
    }
    return !this.dataService.getToken();
  }

  register(user: AdminUserInterface): Observable<AdminUserInterface> {

    return this.httpClient.post(`${BASE_URL}/admin/auth/register`, {...user},
      {headers: this.dataService.headers()})
      .pipe(
        map((data: any) => {
          console.log(data);
          return data.user;
        })
      );
  }

  private expirated(dateExp: number): boolean {
    const currentDate = new Date().getTime() / 1000;
    return ((dateExp - currentDate) < 1200);
  }

  verifyLogin(redirect: boolean = false): Observable<AdminUserInterface> {

    const adminToken = this.dataService.getToken();

    if (adminToken) {

      try {
        const payload = JSON.parse(atob(adminToken.split('.')[1]));
        const isExp = this.expirated(payload.exp);

        if (isExp) {
          return this.httpClient.post(`${BASE_URL}/admin/auth/refreshToken`, {token: adminToken})
            .pipe(
              map((res: { user: AdminUserInterface }) => {
                this.dataService.saveToken(res.user.token);
                return res.user;
              })
            );

        } else {
          return this.httpClient.post(`${BASE_URL}/admin/auth/validateToken`, {token: adminToken})
            .pipe(
              map((res: { user: AdminUserInterface }) => {
                // if (redirect) {
                //   this.router.navigate(['/admin/login']);
                // }
                return res.user;
              })
            );
        }


      } catch (error) {
        return new Observable((subscriber => {
          // if (redirect) {
          //   this.router.navigate(['admin/login']);
          // }
          subscriber.error({status: 404, error: {message: 'Bad admin token'}});
        }));
      }

    } else {
      return new Observable((subscriber => {
        // if (redirect) {
        //   this.router.navigate(['admin/login']);
        // }

        subscriber.error({status: 404, error: {message: 'No admin token'}});
      }));
    }
  }

  logout(): void {
    this.dataService.removeToken();
    this.router.navigate(['admin/login']);
  }

  successRegister(user: AdminUserInterface): void {
    Swal.fire(`Usuaio:  ${user.nick} registrado`);
  }

  removeToken(): void {
    this.dataService.removeToken();
  }
}
