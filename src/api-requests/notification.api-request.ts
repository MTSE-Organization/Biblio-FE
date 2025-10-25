import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  NotificationResType,
  NotificationSearchType
} from '@/types';
import { http } from '@/utils';

const notificationApiRequest = {
  getList: (params?: NotificationSearchType) =>
    http.get<ApiResponseList<NotificationResType>>(
      apiConfig.notification.getList,
      { params }
    ),
  countUnread: () =>
    http.get<ApiResponse<{ count: number }>>(
      apiConfig.notification.countUnread
    ),
  markRead: (id: string) =>
    http.put<ApiResponse<any>>(apiConfig.notification.markRead, {
      pathParams: {
        id
      }
    }),
  readAll: () => http.put<ApiResponse<any>>(apiConfig.notification.readAll),
  deleteAll: () =>
    http.delete<ApiResponse<any>>(apiConfig.notification.deleteAll),
  delete: (id: string) =>
    http.delete<ApiResponse<any>>(apiConfig.notification.delete, {
      pathParams: {
        id
      }
    })
};

export default notificationApiRequest;
