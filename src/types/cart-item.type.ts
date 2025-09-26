import { ProductVariantResType } from './product-variant.type';

export type CartItemResType = {
  id: string;
  cartId: number;
  productVariant: ProductVariantResType;
  quantity: number;
};
