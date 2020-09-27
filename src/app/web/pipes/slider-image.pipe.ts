import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({
  name: 'sliderImage'
})
export class SliderImagePipe implements PipeTransform {

  transform(path: string): string {
    if (path) {
      return `${environment.publicPath}/slider/${path}`;
    }else {
      return `${environment.publicPath}/img_producto/not_available.png`;
    }
  }

}
