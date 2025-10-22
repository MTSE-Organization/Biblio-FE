import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  CreateOrderBodyType,
  OrderBodyType,
  OrderResType,
  OrderSearchType
} from '@/types';
import { http } from '@/utils';

const orderApiRequest = {
  getList: (params?: OrderSearchType) =>
    http.get<ApiResponseList<OrderResType>>(apiConfig.order.getList, {
      params
    }),
  getById: (id: string) =>
    http.get<ApiResponse<OrderResType>>(apiConfig.order.getById, {
      pathParams: {
        id
      }
    }),
  create: (body: CreateOrderBodyType) =>
    http.post<ApiResponse<{ orderId: string }>>(apiConfig.order.create, {
      body
    }),
  cancel: (id: string) =>
    http.put<ApiResponse<any>>(apiConfig.order.cancel, {
      pathParams: {
        id
      }
    }),
  place: (body: OrderBodyType) =>
    http.post<ApiResponse<{ paymentUrl: string }>>(apiConfig.order.place, {
      body
    }),
  complete: (id: string) =>
    http.put<ApiResponse<any>>(apiConfig.order.complete, {
      pathParams: {
        id
      }
    })
};

export default orderApiRequest;
