import { apiConfig } from '@/constants';
import { ApiResponse, CartCheckoutBodyType, CartResType } from '@/types';
import { http } from '@/utils';

const cartApiRequest = {
  getCart: () => http.get<ApiResponse<CartResType>>(apiConfig.cart.getCart),
  addItem: (body: { productVariantId: string; quantity: number }) =>
    http.post<ApiResponse<any>>(apiConfig.cart.addItem, {
      body
    }),
  checkout: (body: CartCheckoutBodyType) =>
    http.post<ApiResponse<{ orderId: string }>>(apiConfig.cart.checkout, {
      body
    })
};

export default cartApiRequest;
