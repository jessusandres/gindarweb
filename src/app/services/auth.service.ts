import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../models/model-actions/user.model';

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

    return this.httpClient.post('localhost:3000/auth/login?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5kcmV3IiwicGFzcyI6ImJsbW9udDEwIiwiaWQiOjIwMjAwM30.WwgI6w5rWu5yXdxuKFsPWhA-4pAl1XoyHVHcKVvjZZ8',
      body).pipe(
      map((res: any) => {
        return new UserModel('Andres', 'algo@algo.com', '123', res.token, '123');
      })
    );

  }
}
