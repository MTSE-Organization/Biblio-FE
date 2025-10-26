import { notificationApiRequest } from '@/api-requests';
import { NotificationSearchType } from '@/types';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

export const useNotificationListQuery = ({
  enabled = false
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [`notification-list`],
    queryFn: () => notificationApiRequest.getList(),
    enabled
  });
};

export const useInfiniteNotificationListQuery = ({
  params,
  enabled
}: {
  params?: NotificationSearchType;
  enabled?: boolean;
} = {}) => {
  return useInfiniteQuery({
    queryKey: ['notification-list', params],
    queryFn: ({ pageParam = 0 }) =>
      notificationApiRequest.getList({ ...params, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length - 1;
      const totalPages = lastPage.data.totalPages;
      if (currentPage + 1 < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
    enabled
  });
};

export const useCountUnreadNotificationQuery = ({
  enabled
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [`count-unread-notification`],
    queryFn: () => notificationApiRequest.countUnread(),
    enabled
  });
};

export const useMarkReadNotificationMutation = () => {
  return useMutation({
    mutationKey: [`mark-read-notification`],
    mutationFn: (id: string) => notificationApiRequest.markRead(id)
  });
};

export const useReadAllNotificationMutation = () => {
  return useMutation({
    mutationKey: [`read-all-notification`],
    mutationFn: () => notificationApiRequest.readAll()
  });
};

export const useDeleteAllNotificationMutation = () => {
  return useMutation({
    mutationKey: [`delete-all-notification`],
    mutationFn: () => notificationApiRequest.deleteAll()
  });
};

export const useDeleteNotificationMutation = () => {
  return useMutation({
    mutationKey: ['delete-notification'],
    mutationFn: (id: string) => notificationApiRequest.delete(id)
  });
};
