import {ItemInterface} from '../interfaces/item.interface';

export class CategoriesModel {
  constructor(public name: string, public code: string, public items: ItemInterface[]) {
  }
}
