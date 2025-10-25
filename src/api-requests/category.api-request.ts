import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  CategoryAutoType,
  CategoryResType,
  CategorySearchType
} from '@/types';
import { http } from '@/utils';

const categoryApiRequest = {
  getList: (params?: CategorySearchType) =>
    http.get<ApiResponseList<CategoryResType>>(apiConfig.category.getList, {
      params
    }),
  getById: (id: string) =>
    http.get<ApiResponse<CategoryResType>>(apiConfig.category.getById, {
      pathParams: {
        id
      }
    }),
  autoComplete: (params?: CategorySearchType) =>
    http.get<ApiResponseList<CategoryAutoType>>(
      apiConfig.category.autoComplete,
      {
        params
      }
    )
};

export default categoryApiRequest;
