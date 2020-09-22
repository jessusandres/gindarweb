import {ItemInterface} from './item.interface';

export interface CartInterface {
  code: string;
  clientCode: string;
  storeRuc: string;
  storeName: string;
  itemCode: string;
  itemFCode: string;
  itemDescription: string;
  amount: number;
  itemPrice: number;
  itemImage: string;
  itemBrand: string;
  itemUnity: string;
  registrationDate: string;
  statusCode: number;
  senderDOF: string;
  detail: ItemInterface;
}
