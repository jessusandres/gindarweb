import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebDataService {

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('gindar_jwt', token);
  }

  getToken(): string {
    return localStorage.getItem('gindar_jwt');
  }

  removeToken(): void {
    localStorage.removeItem('gindar_jwt');
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }
}