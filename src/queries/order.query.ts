import { orderApiRequest } from '@/api-requests';
import { CreateOrderBodyType, OrderBodyType, OrderSearchType } from '@/types';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

export const useInfiniteOrderListQuery = ({
  enabled = false,
  params
}: {
  params?: OrderSearchType;
  enabled: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: ['order-list', params],
    queryFn: ({ pageParam = 0 }) =>
      orderApiRequest.getList({ ...params, page: pageParam }),
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

export const useOrderQuery = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApiRequest.getById(id),
    enabled: !!id
  });
};

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: (body: CreateOrderBodyType) => orderApiRequest.create(body)
  });
};

export const usePlaceOrderMutation = () => {
  return useMutation({
    mutationKey: ['place-order'],
    mutationFn: (body: OrderBodyType) => orderApiRequest.place(body)
  });
};

export const useCancelOrderMutation = () => {
  return useMutation({
    mutationKey: ['cancel-order'],
    mutationFn: (id: string) => orderApiRequest.cancel(id)
  });
};

export const useCompleteOrderMutation = () => {
  return useMutation({
    mutationKey: ['complete-order'],
    mutationFn: (id: string) => orderApiRequest.complete(id)
  });
};
