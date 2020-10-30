import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderInterface, OrderParamsInterface} from '../interfaces/order.interface';
import {BASE_URL, CULQI_KEY, VisaStyles} from '../../config/config';
import {map} from 'rxjs/operators';
import {WebDataService} from './web-data.service';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {AuthState} from '../store/reducers/auth.reducer';
import {VisaSessionInterface} from '../interfaces/visa-session.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private user: UserModel;

  constructor(public httpClient: HttpClient,
              public dataService: WebDataService,
              private store: Store<AppState>) {
    this.store.select('authState').subscribe((authState: AuthState) => {
      this.user = authState.user;
    });
  }

  generateToken(params: OrderParamsInterface): Observable<OrderParamsInterface> {
    const body = {
      ...params.cardData
    };
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
          };
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

    return this.httpClient.post(`${BASE_URL}/order/${this.user.id}`, body,
      {headers: this.dataService.headers()})
      .pipe(
        map((res: any) => res.order)
      );
  }

  generateVisaSession(amount: number): Observable<VisaSessionInterface> {
    return this.httpClient.post(`${BASE_URL}/order/visasession/${this.user.id}`,
      {amount}, {headers: this.dataService.headers()})
      .pipe(
        map((res: any) => {

          // @ts-ignore
          window.configuration = res.visa;
          // @ts-ignore
          window.purchase = res.visa.purchaseNumber;
          // @ts-ignore
          window.dcc = false;

          // @ts-ignore
          window.payform.setConfiguration(window.configuration);

          // @ts-ignore
          window.cardNumber = window.payform.createElement(
            'card-number', {
              style: VisaStyles,
              placeholder: 'Número de Tarjeta'
            },
            'visa_card[number]'
          );

          // @ts-ignore
          window.cardNumber.then(element => {
            element.on('change', (data) => {
              console.log('CHANGE: ', data);
              if (data.length !== 0) {

                let error = '';
                for (const d of data) {
                  error += '* ' + d.message + '\n';
                }

                if (error !== '') {
                  alert(error);
                }
              }
            });
          });

          // @ts-ignore
          // Cvv2
          window.cardCvv = payform.createElement(
            'card-cvc', {
              style: VisaStyles,
              placeholder: 'CVV'
            },
            'visa_card[cvv]'
          );

          // @ts-ignore
          window.cardCvv.then(element => {
            element.on('change', (data) => {
              console.log('CHANGE CVV2: ', data);
            });
          });

          // @ts-ignore
          window.cardExpiry = payform.createElement(
            'card-expiry', {
              style: VisaStyles,
              placeholder: 'MM/AA'
            }, 'visa_card[expiration]'
          );

          // @ts-ignore
          window.cardExpiry.then(element => {
            element.on('change', (data) => {
              console.log('CHANGE F.V: ', data);
            });
          });

          return res.visa;
        })
      );
  }

  private convertToOrderObject(params: OrderParamsInterface): any {

    const apiParams = {
      ...params
    };

    delete apiParams.cardData;
    if (!apiParams.voucher) {
      delete apiParams.voucherName;
      delete apiParams.voucherType;
      delete apiParams.voucherDocument;
    }

    return apiParams;
  }

  private convertToQuotationObject(params: OrderParamsInterface): any {
    const apiParams = {
      ...params
    };
    delete apiParams.paymentToken;
    delete apiParams.cardData;
    return apiParams;
  }

  private convertToSaleNoteObject(params: OrderParamsInterface): any {


    const apiParams = {
      ...params
    };

    delete apiParams.cardData;
    delete apiParams.paymentToken;
    delete apiParams.voucherName;
    delete apiParams.voucherType;
    delete apiParams.voucherDocument;
    return apiParams;
  }


}
