import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  BaseSearchType,
  ViewedProductResType
} from '@/types';
import { http } from '@/utils';

const viewedProductApiRequest = {
  create: (body: { productId: string }) =>
    http.post<ApiResponse<any>>(apiConfig.viewedProduct.create, {
      body
    }),
  delete: (id: string) =>
    http.post<ApiResponse<any>>(apiConfig.viewedProduct.delete, {
      pathParams: { id }
    }),
  getList: (params?: BaseSearchType) =>
    http.get<ApiResponseList<ViewedProductResType>>(
      apiConfig.viewedProduct.getList,
      {
        params
      }
    )
};

export default viewedProductApiRequest;
