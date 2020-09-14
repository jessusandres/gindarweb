import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  constructor() {
  }

  saveToken(token: string): void {
    localStorage.setItem('admin_jwt', token);
  }

  getToken(): string {
    return localStorage.getItem('admin_jwt');
  }

  removeToken(): void {
    localStorage.removeItem('admin_jwt');
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }
}
