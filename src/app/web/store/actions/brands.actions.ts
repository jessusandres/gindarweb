import {Action} from '@ngrx/store';
import {BrandInterface} from '../../interfaces/brand.interface';


export enum BrandsTypes {
  LOAD_BRANDS = '[BRANDS] LOAD BRANDS',
  LOAD_BRANDS_SUCCESS = '[BRANDS] LOAD BRANDS SUCCESS',
  LOAD_BRANDS_FAILURE = '[BRANDS] LOAD BRANDS FAILURE',
}

export class LoadBrandsAction implements Action {
  readonly type = BrandsTypes.LOAD_BRANDS;
}

export class LoadBrandsSuccessAction implements Action {
  readonly type = BrandsTypes.LOAD_BRANDS_SUCCESS;

  constructor(public payload: { brands: BrandInterface[] }) {
  }
}

export class LoadBrandsFailureAcion implements Action {
  readonly type = BrandsTypes.LOAD_BRANDS_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export type BrandsActions = LoadBrandsAction |
  LoadBrandsSuccessAction |
  LoadBrandsFailureAcion;
