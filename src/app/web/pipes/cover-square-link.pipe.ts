import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coverSquareLink'
})
export class CoverSquareLinkPipe implements PipeTransform {

  transform(link: string, type: string): string {
    if (type === 'P') {
      return `vitrina/buscar/${link}`;
    }else {
      return `${link}`;
    }
  }

}
