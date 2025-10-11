import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  ReviewBodyType,
  ReviewResType,
  ReviewSearchType
} from '@/types';
import { http } from '@/utils';

const reviewApiRequest = {
  create: (body: ReviewBodyType) =>
    http.post<ApiResponse<any>>(apiConfig.review.create, {
      body
    }),
  getList: (params?: ReviewSearchType) =>
    http.get<ApiResponseList<ReviewResType>>(apiConfig.review.getList, {
      params
    })
};

export default reviewApiRequest;
