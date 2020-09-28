import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebDataService {

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

  getLocalCart(): any {
    return JSON.parse(localStorage.getItem('cart_gst')) || [];
  }

  setCart(localItems: any[]): void {
    localStorage.setItem('cart_gst', JSON.stringify(localItems));
  }

  dropCart(): void {
    localStorage.removeItem('cart_gst');
  }
}
