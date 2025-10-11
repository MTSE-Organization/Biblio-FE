import { AccountAutoType } from './account.type';
import { BaseSearchType } from './search.type';

export type ReviewBodyType = {
  productId: string;
  rate: number;
  content: string;
};

export type ReviewResType = {
  id: string;
  productId: number;
  account: AccountAutoType;
  rate: number;
  content: string;
  createdDate: string;
  modifiedDate: string;
  status: number;
};

export type ReviewSearchType = {
  productId?: string;
} & BaseSearchType;
