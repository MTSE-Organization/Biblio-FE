import { apiConfig } from '@/constants';
import { ApiResponse, CartResType } from '@/types';
import { http } from '@/utils';

const cartApiRequest = {
  getCart: async () =>
    await http.get<ApiResponse<CartResType>>(apiConfig.cart.getCart),
  addItem: async (body: { productVariantId: string; quantity: number }) => {
    await http.post<ApiResponse<any>>(apiConfig.cart.addItem, {
      body
    });
  }
};

export default cartApiRequest;
