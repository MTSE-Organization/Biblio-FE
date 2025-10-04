import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  CouponResType,
  CouponSearchType
} from '@/types';
import { http } from '@/utils';

const couponApiRequest = {
  getList: (params?: CouponSearchType) =>
    http.get<ApiResponseList<CouponResType>>(apiConfig.coupon.getList, {
      params
    }),
  getById: (id: string) =>
    http.get<ApiResponse<CouponResType>>(apiConfig.coupon.getById, {
      pathParams: { id }
    })
};

export default couponApiRequest;
