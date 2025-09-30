import { CartItemResType } from './cart-item.type';

export type CartResType = {
  id: string;
  accountId: number;
  cartItems: CartItemResType[];
  createdDate: string;
  modifiedDate: string;
  status: number;
};
