import {ItemInterface, ItemSizesInterface} from '../interfaces/item.interface';

export class ItemModel implements ItemInterface {
  public code: string;
  public allowVoucher: boolean;
  public appPrice: number;
  public brandCode: number;
  public brandName: string;
  public codf: string;
  public description: string;
  public ruc: string;
  public shortDescription: string;
  public sysPrice: number;
  public unity: string;
  public webPrice: number;
  public image: string;
  public sizes: ItemSizesInterface[];

  constructor(obj: ItemInterface) {
    this.code = obj.code;
    this.allowVoucher = obj.allowVoucher;
    this.appPrice = obj.appPrice;
    this.brandCode = obj.brandCode;
    this.brandName = obj.brandName;
    this.codf = obj.codf;
    this.description = obj.description;
    this.ruc = obj.ruc;
    this.shortDescription = obj.shortDescription;
    this.sysPrice = obj.sysPrice;
    this.unity = obj.unity;
    this.webPrice = obj.webPrice;
    this.image = obj.image;
  }


}

