import { CartStoreType } from '@/types';
import { create } from 'zustand';

const initialState = {
  selectedFreeShipCoupon: null,
  selectedDiscountCoupon: null,
  selectedCartItems: []
};

const useCartStore = create<CartStoreType>((set) => ({
  ...initialState,

  setSelectedFreeShipCoupon: (selectedFreeShipCoupon) =>
    set({ selectedFreeShipCoupon }),

  setSelectedDiscountCoupon: (selectedDiscountCoupon) =>
    set({ selectedDiscountCoupon }),

  setSelectedCartItems: (selectedCartItems) => set({ selectedCartItems }),

  resetStore: () => set(initialState)
}));

export default useCartStore;
