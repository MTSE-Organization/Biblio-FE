import { apiConfig } from '@/constants';
import { ApiResponse, ReviewBodyType } from '@/types';
import { http } from '@/utils';

const reviewApiRequest = {
  create: (body: ReviewBodyType) =>
    http.post<ApiResponse<any>>(apiConfig.review.create, {
      body
    })
};

export default reviewApiRequest;
