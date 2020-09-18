import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(sysprice: number, webprice: number): string {
    const percent = (webprice / sysprice) * 100;
    return (100 - percent).toFixed(0);
  }

}
