import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'coverSquareImage'
})
export class CoverSquareImagePipe implements PipeTransform {

  transform(path: string): string {
    if (path) {
      return `${environment.publicPath}/secondary-slider/${path}`;
    }else {
      return `${environment.publicPath}/secondary-slider/not_available.png`;
    }
  }

}
