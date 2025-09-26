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
