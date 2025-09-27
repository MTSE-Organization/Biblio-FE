import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  ProductAutoType,
  ProductResType,
  ProductSearchType
} from '@/types';
import { http } from '@/utils';

const productApiRequest = {
  getList: async (params?: ProductSearchType) =>
    await http.get<ApiResponseList<ProductAutoType>>(
      apiConfig.product.getList,
      {
        params
      }
    ),
  getLatestList: async () =>
    await http.get<ApiResponseList<ProductAutoType>>(
      apiConfig.product.getLatest
    ),
  getTopDiscountList: async () =>
    await http.get<ApiResponseList<ProductAutoType>>(
      apiConfig.product.getTopDiscount
    ),
  getBestSellerList: async () =>
    await http.get<ApiResponseList<ProductAutoType>>(
      apiConfig.product.getBestSeller
    ),
  getById: async (id: string) =>
    await http.get<ApiResponse<ProductResType>>(apiConfig.product.getById, {
      pathParams: { id }
    }),
  getListByCategory: async (id: string) =>
    await http.get<ApiResponseList<ProductAutoType>>(
      apiConfig.product.getListByCategory,
      {
        pathParams: {
          id
        }
      }
    ),
  getTopViewList: async () =>
    await http.get<ApiResponseList<ProductAutoType>>(
      apiConfig.product.getTopView
    )
};

export default productApiRequest;
