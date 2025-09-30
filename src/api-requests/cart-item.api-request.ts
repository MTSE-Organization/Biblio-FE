import { apiConfig } from '@/constants';
import { ApiResponse } from '@/types';
import { http } from '@/utils';

const cartItemApiRequest = {
  deleteItem: async (id: string) => {
    await http.post<ApiResponse<any>>(apiConfig.cartItem.deleteCartItem, {
      pathParams: { id }
    });
  },
  updateCartItem: async (body: { id: string; quantity: number }) => {
    await http.put<ApiResponse<any>>(apiConfig.cartItem.updateCartItem, {
      body
    });
  }
};

export default cartItemApiRequest;
