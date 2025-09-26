import { apiConfig } from '@/constants';
import { ApiResponse } from '@/types';
import { CartResType } from '@/types/cart.type';
import { http } from '@/utils';

const cartApiRequest = {
  getCart: async () =>
    await http.get<ApiResponse<CartResType>>(apiConfig.cart.getCart)
};

export default cartApiRequest;
