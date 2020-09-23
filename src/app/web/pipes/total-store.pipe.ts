import {Pipe, PipeTransform} from '@angular/core';
import {CartInterface} from '../interfaces/cart_item.interface';
import {WebRuc} from '../types/types';

@Pipe({
  name: 'totalStore'
})
export class TotalStorePipe implements PipeTransform {

  transform(ruc: string, [gindar, roger, other]: CartInterface[][]): string {

    let total = 0.00;

    switch (ruc) {
      case WebRuc.GINDAR: {
        gindar.map((item) => total += item.amount * item.itemPrice);
        break;
      }
      case WebRuc.ROGER: {
        roger.map((item) => total += item.amount * item.itemPrice);
        break;
      }
      default: {
        other.map((item) => total += item.amount * item.itemPrice);
        break;
      }
    }

    return total.toFixed(2);
  }

}
