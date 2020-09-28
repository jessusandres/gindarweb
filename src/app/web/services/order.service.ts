import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CardInterface, OrderInterface, OrderParamsInterface} from "../interfaces/order.interface";
import {BASE_URL, CULQI_KEY} from "../../config/config";
import {map} from "rxjs/operators";
import {WebDataService} from "./web-data.service";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {AuthState} from "../store/reducers/auth.reducer";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private user: UserModel;

  constructor(public httpClient: HttpClient, public dataService: WebDataService, private store: Store<AppState>) {
    this.store.select('authState').subscribe((authState: AuthState) => {
      this.user = authState.user;
    });
  }

  generateToken(params: OrderParamsInterface) {
    const body = {
      ...params.cardData
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${CULQI_KEY}`
    });

    return this.httpClient.post('https://secure.culqi.com/v2/tokens', body, {headers})
      .pipe(
        map((res: any) => {
          // console.log(res);

          const newParams: OrderParamsInterface = {
            ...params,
            paymentToken: res.id
          }
          return newParams;
        })
      );
  }

  generateOrder(params: OrderParamsInterface, type: number): Observable<OrderInterface> {
    let body = {};
    switch (type) {
      case 0: {
        body = this.convertToSaleNoteObject(params);
        break;
      }
      case 1: {
        body = this.convertToQuotationObject(params);
        break;
      }
      default: {
        body = this.convertToOrderObject(params);
      }
    }

    // console.log(body);

    return this.httpClient.post(`${BASE_URL}/order/${this.user.id}`, body, {headers: this.dataService.headers()})
      .pipe(
        map((res: any) => {
          // console.log(res);
          return res.order;
        })
      );
  }

  convertToOrderObject(params: OrderParamsInterface): any {

    const apiParams = {
      ...params
    }

    delete apiParams.cardData;
    if (!apiParams.voucher) {
      delete apiParams.voucherName;
      delete apiParams.voucherType;
      delete apiParams.voucherDocument;
    }

    return apiParams;
  }

  convertToQuotationObject(params: OrderParamsInterface): any {
    const apiParams = {
      ...params
    }
    delete apiParams.paymentToken;
    delete apiParams.cardData;
    return apiParams;
  }

  convertToSaleNoteObject(params: OrderParamsInterface): any {


    const apiParams = {
      ...params
    }

    delete apiParams.cardData;
    delete apiParams.paymentToken;
    delete apiParams.voucherName;
    delete apiParams.voucherType;
    delete apiParams.voucherDocument;
    return apiParams;
  }
}
