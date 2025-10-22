import { OrderStoreType } from '@/types';
import { create } from 'zustand';

const useOrderStore = create<OrderStoreType>((set) => ({
  loading: true,
  addressId: '',
  note: '',
  paymentMethod: -1,
  setAddressId: (addressId) => set({ addressId }),
  setNote: (note) => set({ note }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setLoading: (loading: boolean) => set({ loading })
}));

export default useOrderStore;
