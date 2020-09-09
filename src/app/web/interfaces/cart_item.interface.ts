import {ItemModel} from '../models/item.model';

export interface CartItem {
  code: string;
  item: ItemModel;
  date: string;
}
