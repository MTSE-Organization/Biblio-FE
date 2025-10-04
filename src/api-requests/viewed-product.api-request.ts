import { apiConfig } from '@/constants';
import { ApiResponse } from '@/types';
import { http } from '@/utils';

const viewedProductApiRequest = {
  create: (body: { productId: string }) =>
    http.post<ApiResponse<any>>(apiConfig.viewedProduct.create, {
      body
    })
};

export default viewedProductApiRequest;
