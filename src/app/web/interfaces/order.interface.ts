export interface OrderInterface {
  date: string;
  code: string;
  storeRuc: string;
  clientCode: string;
  clientName: string;
  clientLastName: string;
  clientDOF: string;
  currencyCode: string;
  total: number;
  igv: number;
  net: number;
  efectiveAmount: number;
  status: number;
  observation: string;
  os: string;
  navegator: string;
  origin: string;
  voucherDocumentCode: VoucherTypes;
  voucherDOF: string;
  voucherName: string;
  documentCode: string;
  documentNumber: string;
  register: string;
  paymentGateway: number;
  cardBrand: string;
  cardNumber: string;
  paymentStatus: number;
  paymentDate: string;
  address: string;
  addressReference: string;
  ubigeo: string;
  phone: string;
  respond: number;
  details?: OrderDetailInterface[];
}

export interface OrderDetailInterface {
  date: string;
  orderCode: string;
  storeRuc: string;
  clientCode: string;
  itemCode: string;
  itemCodf: string;
  index: number;
  itemDescription: string;
  itemBrand: string;
  unity: string;
  amount: number;
  itemPrice: number;
  tota: number;
  totn: number;
  currencyCode: string;
  status: number;
  sellerCode: string;
  withIGV: boolean;
  observation: string;
}

export enum VoucherTypes {
  FAC = 'F',
  BOL = 'B',
}

export interface OrderParamsInterface {
  ruc: string;
  phone: string;
  email: string;
  dof: string;
  voucher: boolean;
  voucherType: VoucherTypes;
  voucherName: string;
  voucherDocument: string;
}
