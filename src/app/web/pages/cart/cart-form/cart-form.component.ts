import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {ShowCartForm} from '../../../store/actions/cart.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EMAIL_REGEX} from '../../../../config/config';

declare function $(s: string): any;

declare function mdbMinPlugin(): any;

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styles: []
})
export class CartFormComponent implements OnInit {

  orderForm: FormGroup;

  voucher: boolean;

  voucherDocLength: number;
  voucherDocLText: string;
  voucherNameLText: string;
  docTypeLText: string;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    // {{url}}/order/quotation/000001
    // TODO agregar ruc en servicio

    this.voucher = false;

    this.orderForm = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      dof: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      voucherType: new FormControl('B', []),
      voucherName: new FormControl('', []),
      voucherDocument: new FormControl('', []),
    });

    this.voucherDocLength = 8;
    this.voucherDocLText = 'DNI';
    this.voucherNameLText = 'Nombres';
    this.docTypeLText = 'Boleta';

    mdbMinPlugin();

  }

  sendOrder(): void {
    console.log('send order');
    console.log(this.voucher);
    console.log(this.orderForm);
  }

  hideForm(): void {
    this.store.dispatch(new ShowCartForm({show: false}));
  }

  toggleVoucher(): void {
    this.voucher = !this.voucher;
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
}
