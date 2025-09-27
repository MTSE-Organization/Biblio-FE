import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  ProductResType,
  ProductSearchType
} from '@/types';
import { http } from '@/utils';

const productApiRequest = {
  getList: async (params?: ProductSearchType) =>
    await http.get<ApiResponseList<ProductResType>>(apiConfig.product.getList, {
      params
    }),
  getLatestList: async () =>
    await http.get<ApiResponseList<ProductResType>>(
      apiConfig.product.getLatest
    ),
  getTopDiscountList: async () =>
    await http.get<ApiResponseList<ProductResType>>(
      apiConfig.product.getTopDiscount
    ),
  getBestSellerList: async () =>
    await http.get<ApiResponseList<ProductResType>>(
      apiConfig.product.getBestSeller
    ),
  getById: async (id: string) =>
    await http.get<ApiResponse<ProductResType>>(apiConfig.product.getById, {
      pathParams: { id }
    }),
  getFeature: async () =>
    await http.get<ApiResponseList<ProductResType>>(
      apiConfig.product.getFeature
    )
};

export default productApiRequest;
