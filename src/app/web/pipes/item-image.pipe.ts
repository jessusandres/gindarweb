import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'itemImage'
})
export class ItemImagePipe implements PipeTransform {

  transform(path: string): string {
    if (path) {
     return `./assets/img/img_producto/${path}`;
    }else {
      return './assets/img/img_producto/not_available.png';
    }
  }

}
