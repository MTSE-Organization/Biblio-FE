import { apiConfig } from '@/constants';
import { ApiResponseList, CategoryResType, CategorySearchType } from '@/types';
import { http } from '@/utils';

const categoryApiRequest = {
  getList: (params?: CategorySearchType) =>
    http.get<ApiResponseList<CategoryResType>>(apiConfig.category.getList, {
      params
    })
};

export default categoryApiRequest;
