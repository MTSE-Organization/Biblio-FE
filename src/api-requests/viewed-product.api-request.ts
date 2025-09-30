import { apiConfig } from '@/constants';
import { ApiResponse } from '@/types';
import { http } from '@/utils';

const viewedProductApiRequest = {
  create: async (body: { productId: string }) =>
    await http.post<ApiResponse<any>>(apiConfig.viewedProduct.create, {
      body
    })
};

export default viewedProductApiRequest;
