import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  ProductAutoType,
  ProductResType,
  ProductSearchType,
  SearchType
} from '@/types';
import { http } from '@/utils';

const productApiRequest = {
  getList: (params?: ProductSearchType) =>
    http.get<ApiResponseList<ProductAutoType>>(apiConfig.product.getList, {
      params
    }),
  getLatestList: () =>
    http.get<ApiResponseList<ProductAutoType>>(apiConfig.product.getLatest),
  getTopDiscountList: () =>
    http.get<ApiResponseList<ProductAutoType>>(
      apiConfig.product.getTopDiscount
    ),
  getBestSellerList: () =>
    http.get<ApiResponseList<ProductAutoType>>(apiConfig.product.getBestSeller),
  getById: (id: string) =>
    http.get<ApiResponse<ProductResType>>(apiConfig.product.getById, {
      pathParams: { id }
    }),
  getListByCategory: (id: string) =>
    http.get<ApiResponseList<ProductAutoType>>(
      apiConfig.product.getListByCategory,
      {
        pathParams: {
          id
        }
      }
    ),
  getTopViewList: () =>
    http.get<ApiResponseList<ProductAutoType>>(apiConfig.product.getTopView),
  search: (params?: SearchType) =>
    http.get<ApiResponseList<ProductAutoType>>(apiConfig.product.search, {
      params
    })
};

export default productApiRequest;
