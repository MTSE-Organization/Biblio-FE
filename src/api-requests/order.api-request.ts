import { apiConfig } from '@/constants';
import { ApiResponse, OrderBodyType, OrderResType } from '@/types';
import { http } from '@/utils';

const orderApiRequest = {
  getById: (id: string) =>
    http.get<ApiResponse<OrderResType>>(apiConfig.order.getById, {
      pathParams: {
        id
      }
    }),
  place: (body: OrderBodyType) =>
    http.post<ApiResponse<any>>(apiConfig.order.place, {
      body
    })
};

export default orderApiRequest;
