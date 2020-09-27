import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({
  name: 'itemImage'
})
export class ItemImagePipe implements PipeTransform {

  transform(path: string): string {
    if (path) {
     return `${environment.publicPath}/img_producto/${path}`;
    }else {
      return `${environment.publicPath}/img_producto/not_available.png`;
    }
  }

}
