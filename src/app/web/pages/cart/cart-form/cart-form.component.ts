import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { ShowCartForm, ToggleOnlinePaymentAction, ToggleVoucherAction } from '../../../store/actions/cart.actions';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EMAIL_REGEX, NUMBER_REGEX } from '../../../../config/config';
import { OrderParamsInterface } from '../../../interfaces/order.interface';
import { GenerateOrderAction, GenerateOrderFailureAction, GenerateVisaSessionAction, SwitchOrderAction } from '../../../store/actions/order.actions';
import { Subscription } from 'rxjs';
import { CartState } from '../../../store/reducers/cart.reducer';
import { StoreSelected } from '../../../interfaces/ui.interfaces';
import { WebRuc } from '../../../types/types';
import { AuthState } from '../../../store/reducers/auth.reducer';
import { UserModel } from '../../../models/user.model';
import { VisaSessionInterface } from '../../../interfaces/visa-session.interface';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

declare function $(s: string): any;

declare function mdbMinPlugin(): any;

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styles: []
})
export class CartFormComponent implements OnInit, OnDestroy {

  @Input() private errorSwal: SwalComponent;
  orderForm: FormGroup;

  voucher: boolean;
  onlinePayment: boolean;

  voucherDocLength: number;
  voucherDocLText: string;
  voucherNameLText: string;
  docTypeLText: string;

  // formError: boolean;
  formErrorMessage: string;
  tokenCardError: boolean;
  tokenCardErrorMessage: string;

  orderError: boolean;
  orderErrorMessage: string;
  orderButtonText = 'Ordenar';

  selectedRUC: StoreSelected;
  private cartSubscription: Subscription;
  private orderSubscription: Subscription;
  private userSubscription: Subscription;

  private totalToPay: number;
  private user: UserModel;
  private visaSessionParams: VisaSessionInterface;
  generateVisaSession: boolean;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.userSubscription = this.store.select('authState').subscribe((authState: AuthState) => {
      this.user = authState.user;
    });

    this.cartSubscription = this.store.select('cartState').subscribe((cartState: CartState) => {
      this.selectedRUC = cartState.storeSelected;
      this.totalToPay = cartState.total;
      this.voucher = cartState.voucher;
      this.onlinePayment = cartState.onlinePayment;

      this.orderForm = this.setOrderForm();

      setTimeout(() => {
        mdbMinPlugin();
      });
    });

    this.orderSubscription = this.store.select('orderState').subscribe((orderState) => {
      this.orderError = orderState.error;
      this.orderErrorMessage = orderState.errorMessage;

      if (orderState.loading === false && orderState.error === true && this.selectedRUC.ruc.slice(0, 2) === '10') {
        this.errorSwal?.fire()
          .then(() => {
            window.location.reload();
          });
      }

      this.generateVisaSession = orderState.visaSessionLoading;
      this.visaSessionParams = orderState.visaSessionParams;

      if (orderState.order) {
        this.orderForm.setValue({ ...orderState.order });
        setTimeout(() => {
          mdbMinPlugin();
        });
      }

    });

    this.voucherDocLength = 8;
    this.voucherDocLText = 'DNI';
    this.voucherNameLText = 'Nombres';
    this.docTypeLText = 'Boleta';

    mdbMinPlugin();

    if (this.selectedRUC.ruc === WebRuc.ROGER && this.orderError === false) {
      // @ts-ignore
      window.amount = this.totalToPay;
      this.store.dispatch(new GenerateVisaSessionAction({ total: this.totalToPay }));
    }

  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  private setOrderForm(): FormGroup {
    return new FormGroup({
      phone: new FormControl(this.orderForm ? this.orderForm.get('phone').value : '934556536',
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
      email: new FormControl(this.orderForm ? this.orderForm.get('email').value : 'accept@cybersource.com',
        [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      dof: new FormControl(this.orderForm ? this.orderForm.get('dof').value : '75747625',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),

      voucherType: new FormControl(this.orderForm ? this.orderForm.get('voucherType').value : 'B', []),
      voucherName: new FormControl(this.orderForm ? this.orderForm.get('voucherName').value : '',
        [Validators.minLength(5)]),

      voucherDocument: new FormControl(this.orderForm ? this.orderForm.get('voucherDocument').value : '',
        [Validators.minLength(8), Validators.maxLength(11)]),

      cardNumber: new FormControl(this.orderForm ? this.orderForm.get('cardNumber').value : '4919148107859067',
        [Validators.minLength(8)]),
      cardCVV: new FormControl(this.orderForm ? this.orderForm.get('cardCVV').value : '123',
        [Validators.maxLength(4), Validators.minLength(3), Validators.pattern(NUMBER_REGEX)]),
      cardMonth: new FormControl(this.orderForm ? this.orderForm.get('cardMonth').value : '',
        [Validators.maxLength(2), Validators.pattern(NUMBER_REGEX)]),
      cardYear: new FormControl(this.orderForm ? this.orderForm.get('cardYear').value : '',
        [Validators.maxLength(4), Validators.pattern(NUMBER_REGEX)]),

    }, {
      validators: [
        this.verifyVoucherType(),
        this.voucherParamsValidator(),
        this.onlinePaymentValidator(),
      ]
    });
  }

  private voucherParamsValidator(): ValidatorFn {
    return (formGroup: FormGroup) => {

      if (this.voucher) {
        if (!formGroup.get('voucherType').value) {
          return {
            voucherTypeUndefined: true
          };
        }
        if (!formGroup.get('voucherName').value || formGroup.get('voucherName').value.length < 5) {
          return {
            voucherNameUndefined: true
          };
        }
        if (!formGroup.get('voucherDocument').value) {
          return {
            voucherDocumentUndefined: true
          };
        } else {
          if (formGroup.get('voucherType').value === 'B') {
            if (formGroup.get('voucherDocument').value.length !== 8) {
              return {
                voucherDocumentUndefined: true
              };
            }
          } else {
            if (formGroup.get('voucherDocument').value.length !== 11) {
              return {
                voucherDocumentUndefined: true
              };
            }
          }
        }

      }

      return null;
    };
  }

  private onlinePaymentValidator(): ValidatorFn {
    return (formGroup: FormGroup) => {
      if (this.onlinePayment) {
        if (!formGroup.get('cardNumber').value || formGroup.get('cardNumber').value.length < 8) {
          return {
            cardNumberUndefined: true
          };
        }
        if (!formGroup.get('cardCVV').value || formGroup.get('cardCVV').value.length < 3) {
          return {
            cardCVVUndefined: true
          };
        }

        if (this.selectedRUC.ruc === WebRuc.GINDAR) {
          if (!formGroup.get('cardMonth').value || formGroup.get('cardMonth').value.length !== 2) {
            return {
              cardMonthUndefined: true
            };
          }
          if (!formGroup.get('cardYear').value || formGroup.get('cardYear').value.length !== 4) {
            return {
              cardYearUndefined: true
            };
          }
        }


      }
      return null;
    };
  }

  private verifyVoucherType(): ValidatorFn {
    return (formGroup: FormGroup) => {

      if (this.voucher) {

        if (!(formGroup.get('voucherType').value === 'F' ||
          formGroup.get('voucherType').value === 'B')) {
          return {
            voucherType: false
          };
        }

      }
      return null;
    };
  }

  hideForm(): void {
    this.store.dispatch(new ShowCartForm({ show: false }));
  }

  toggleVoucher(): void {
    this.voucher = !this.voucher;
    this.store.dispatch(new ToggleVoucherAction({ status: this.voucher }));
    setTimeout(() => mdbMinPlugin());
  }

  changeVoucherType(): void {
    const val = this.orderForm.get('voucherType').value;

    if (val === 'F') {
      this.voucherDocLength = 11;
      this.voucherDocLText = 'RUC';
      this.docTypeLText = 'Factura';
      this.voucherNameLText = 'Razón Social';
    } else {
      this.voucherDocLength = 8;
      this.voucherDocLText = 'DNI';
      this.docTypeLText = 'Boleta';
      this.voucherNameLText = 'Nombres';
    }
  }

  togglePayment(): void {
    this.onlinePayment = !this.onlinePayment;
    this.store.dispatch(new ToggleOnlinePaymentAction({ status: this.onlinePayment }));
    setTimeout(() => mdbMinPlugin());
  }

  getOrderParamsByForm(): OrderParamsInterface {
    return {
      cardData: {
        card_number: this.orderForm.get('cardNumber').value,
        cvv: this.orderForm.get('cardCVV').value,
        email: this.orderForm.get('email').value,
        expiration_month: this.orderForm.get('cardMonth').value,
        expiration_year: this.orderForm.get('cardYear').value
      },
      dof: this.orderForm.get('dof').value,
      email: this.orderForm.get('email').value,
      onlinePayment: this.onlinePayment,
      paymentToken: null,
      phone: this.orderForm.get('phone').value,
      ruc: this.selectedRUC.ruc,
      voucher: this.voucher,
      voucherType: this.orderForm.get('voucherType').value,
      voucherName: this.orderForm.get('voucherName').value,
      voucherDocument: this.orderForm.get('voucherDocument').value
    };
  }

  sendOrder(): void {

    if (this.orderForm.invalid) {
      this.formErrorMessage = 'Datos de pedido incorrectos';
      this.orderForm.markAllAsTouched();
      return;
    }
    this.formErrorMessage = null;

    const orderParams: OrderParamsInterface = this.getOrderParamsByForm();

    if (this.selectedRUC.ruc === WebRuc.ROGER) {
      this.generateVisaSession = true;
      this.orderButtonText = 'Inciando proceso de pago...';
      console.log('GENERATE TOKEN');
      const data = {
        name: this.user.name,
        lastName: this.user.lastname,
        email: orderParams.email,
        currencyConversion: 'PEN',
        recurrence: false,
        alias: 'KS',
        installment: 0,
      };
      // 4919148107859067

      // @ts-ignore
      window.payform.createToken(
        // @ts-ignore
        [window.cardNumber, window.cardExpiry, window.cardCvv], data)
        .then((visaObject) => {
          console.log(visaObject);
          if (visaObject) {
            this.generateVisaSession = false;
            orderParams.paymentToken = visaObject.transactionToken;
            orderParams.visaObject = {
              ...visaObject,
              total: this.totalToPay,
              purchaseNumber: this.visaSessionParams.purchasenumber
            };
            this.store.dispatch(new GenerateOrderAction({ orderParams, type: 2 }));
          } else {
            this.store.dispatch(new GenerateOrderFailureAction({ message: 'No se generó el token.' }));
          }

        }).catch((error) => {
          console.log(error);
        });
    } else {
      this.store.dispatch(new SwitchOrderAction({
        orderParams
      }));
    }


  }


}
