import { apiConfig } from '@/constants';
import { ApiResponse } from '@/types';
import { http } from '@/utils';

const cartItemApiRequest = {
  deleteItem: async (id: string) => {
    await http.post<ApiResponse<any>>(apiConfig.cartItem.deleteCartItem, {
      pathParams: { id }
    });
  }
};

export default cartItemApiRequest;
