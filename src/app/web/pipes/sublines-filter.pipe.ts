import {Pipe, PipeTransform} from '@angular/core';
import {SublineInterface} from '../interfaces/subline.interface';

@Pipe({
  name: 'sublinesFilter'
})
export class SublinesFilterPipe implements PipeTransform {

  transform(sublines: SublineInterface[], type: number): SublineInterface[] {
    return sublines.filter(categorie => categorie.filter === type);
  }

}
