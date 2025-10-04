import { CouponResType } from '@/types/coupon.type';
import { CartItemResType } from './cart-item.type';

export type CartResType = {
  id: string;
  accountId: number;
  cartItems: CartItemResType[];
  createdDate: string;
  modifiedDate: string;
  status: number;
};

export type CartCheckoutBodyType = {
  cartItemIds: string[];
  couponIds: string[];
};

export type CartStoreType = {
  selectedCartItems: string[];
  selectedFreeShipCoupon: CouponResType | null;
  selectedDiscountCoupon: CouponResType | null;
  setSelectedFreeShipCoupon: (coupon: CouponResType | null) => void;
  setSelectedDiscountCoupon: (coupon: CouponResType | null) => void;
  setSelectedCartItems: (selectedCartItems: string[]) => void;
};
