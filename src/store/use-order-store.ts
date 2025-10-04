import { OrderStoreType } from '@/types';
import { create } from 'zustand';

const useOrderStore = create<OrderStoreType>((set) => ({
  addressId: '',
  note: '',
  paymentMethod: -1,
  setAddressId: (addressId) => set({ addressId }),
  setNote: (note) => set({ note }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod })
}));

export default useOrderStore;
