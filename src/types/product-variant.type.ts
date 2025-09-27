import { BaseSearchType } from '@/types/search.type';
import { ProductResType } from './product.type';

export type ProductVariantResType = {
  id: string;
  condition: number;
  format: number;
  quantity: number;
  modifiedPrice: string;
  imageUrl: string;
  product: ProductResType;
  createdDate: string;
  modifiedDate: string;
  status: number;
};

export type ProductVariantSearchType = {
  condition?: number;
  format?: number;
  productId?: string;
  status?: number;
} & BaseSearchType;
