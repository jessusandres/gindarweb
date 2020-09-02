import { Pipe, PipeTransform } from '@angular/core';
import {CategorieInterface} from '../interfaces/categories.response.interface';

@Pipe({
  name: 'categoriesFilter'
})
export class CategoriesFilterPipe implements PipeTransform {

  transform(categories: CategorieInterface[], type: number): CategorieInterface[] {
    return categories.filter(categorie => categorie.categorieCode === type);
  }

}
