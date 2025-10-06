import { AccountResType } from './account.type';
import { ProductAutoType } from './product.type';
import { BaseSearchType } from './search.type';

export type FavoriteProductResType = {
  id: string;
  product: ProductAutoType;
  account: AccountResType;
  createdDate: string;
  modifiedDate: string;
  status: number;
};

export type FavoriteProductSearchType = {
  productId?: string;
} & BaseSearchType;
