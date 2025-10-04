import { CartStoreType } from '@/types';
import { create } from 'zustand';

const useCartStore = create<CartStoreType>((set) => ({
  selectedFreeShipCoupon: null,
  selectedDiscountCoupon: null,
  selectedCartItems: [],
  setSelectedFreeShipCoupon: (selectedFreeShipCoupon) =>
    set({ selectedFreeShipCoupon }),
  setSelectedDiscountCoupon: (selectedDiscountCoupon) =>
    set({ selectedDiscountCoupon }),
  setSelectedCartItems: (selectedCartItems) => set({ selectedCartItems })
}));

export default useCartStore;
