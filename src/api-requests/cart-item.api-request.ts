import { apiConfig } from '@/constants';
import { ApiResponse } from '@/types';
import { http } from '@/utils';

const cartItemApiRequest = {
  deleteItem: (id: string) =>
    http.post<ApiResponse<any>>(apiConfig.cartItem.deleteCartItem, {
      pathParams: { id }
    }),
  updateCartItem: (body: { id: string; quantity: number }) =>
    http.put<ApiResponse<any>>(apiConfig.cartItem.updateCartItem, {
      body
    })
};

export default cartItemApiRequest;
