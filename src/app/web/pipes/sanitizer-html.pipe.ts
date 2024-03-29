import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'sanitizerHtml'
})
export class SanitizerHtmlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(value: any): any {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}
