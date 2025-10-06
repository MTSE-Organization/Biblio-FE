import { ProductAutoType } from './product.type';

export type ViewedProductResType = {
  id: string;
  product: ProductAutoType;
  viewedAt: string;
  viewCount: number;
  createdDate: string;
  modifiedDate: string;
  status: number;
};
