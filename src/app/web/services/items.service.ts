import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpClient: HttpClient) {
  }

  getSliders(): void {
    this.httpClient.get('http://localhost:3000/items')
      .subscribe( res => {
        // console.log(res);
      });
  }
}
