import {ItemInterface} from '../interfaces/item.interface';


export class ItemModel implements ItemInterface {


  constructor(public code: string,
              public name: string) {
  }
}

