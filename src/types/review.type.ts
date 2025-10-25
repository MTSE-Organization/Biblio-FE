import { AccountAutoType } from './account.type';
import { BaseSearchType } from './search.type';

export type ReviewBodyType = {
  productId: string;
  productVariantId: string;
  rate: number;
  content: string;
  orderId: string;
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

export type ReviewSummaryResType = {
  rate: number;
  total: number;
};

export type CheckReviewBody = {
  orderId: string;
  productId: string;
  productVariantId: string;
};

export type CheckReviewResType = {
  isReviewed: boolean;
};
