import { AppLoadingStore } from '@/types';
import { create } from 'zustand';

export const useAppLoadingStore = create<AppLoadingStore>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  withLoading: async (promise) => {
    set({ loading: true });
    try {
      return await promise;
    } finally {
      set({ loading: false });
    }
  }
}));
