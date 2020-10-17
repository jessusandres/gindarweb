export interface ItemSizesInterface {
  itemCode: string;
  sizeGroupCode: string;
  size: string;
}

export interface ItemInterface {
  ruc: string;
  code: string;
  codf: string;
  description: string;
  image: string;
  brandCode: number;
  brandName: string;
  unity: string;
  sysPrice: number;
  webPrice: number;
  appPrice: number;
  allowVoucher: boolean;
  shortDescription: string;
  sizes: ItemSizesInterface[];
}
