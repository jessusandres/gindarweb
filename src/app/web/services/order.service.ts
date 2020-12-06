import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderInterface, OrderParamsInterface} from '../interfaces/order.interface';
import {BASE_URL, VisaStyles} from '../../config/config';
import {map} from 'rxjs/operators';
import {WebDataService} from './web-data.service';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {AuthState} from '../store/reducers/auth.reducer';
import {VisaSessionInterface} from '../interfaces/visa-session.interface';
import { environment } from 'src/environments/environment';

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
      Authorization: `Bearer ${environment.culqiKey}`
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
          console.log(res);
          const visa: VisaSessionInterface = res.visa;
          const min = 1;
          const max = 999999999999;
          const random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
          visa.purchasenumber = random.toString();
          // @ts-ignore
          window.amount = visa.amount;
          // @ts-ignore
          window.configuration = {
            sessionkey: visa.sessionkey,
            channel: 'web',
            merchantid: visa.merchantid,
            purchasenumber: visa.purchasenumber,
            amount,
            callbackurl: '',
            language: 'es',
            font: 'https://fonts.googleapis.com/css?family=Montserrat:400&display=swap',
          };

          // @ts-ignore
          console.log('Window configuration: ', window.configuration);
          // @ts-ignore
          window.purchase = visa.purchasenumber;
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
            'visa_card_number'
          );

          // @ts-ignore
          window.cardNumber.then(element => {

            element.on('bin', (data) => {
              console.log('BIN: ', data);
            });

            element.on('dcc', (data) => {
              console.log('DCC', data);
              if (data != null) {
                // @ts-ignore
                const mres = confirm('Usted tiene la opción de pagar su factura en: PEN ' + window.amount + ' o ' + data.currencyCodeAlpha + ' ' + data.amount + '. Una vez haya hecho su elección, la transacción continuará con la moneda seleccionada. Tasa de cambio PEN a ' + data.currencyCodeAlpha + ': ' + data.exchangeRate + ' \n \n' + data.currencyCodeAlpha + ' ' + data.amount + '\nPEN = ' + data.currencyCodeAlpha + ' ' + data.exchangeRate + '\nMARGEN FX: ' + data.markup);
                if (mres === true) {
                  // @ts-ignore
                  window.dcc = true;
                } else {
                  // @ts-ignore
                  window.dcc = false;
                }
              }
            });
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
