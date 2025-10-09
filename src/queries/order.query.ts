import { orderApiRequest } from '@/api-requests';
import { CreateOrderBodyType, OrderBodyType, OrderSearchType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useOrderListQuery = (params?: OrderSearchType) => {
  return useQuery({
    queryKey: ['order-list', params],
    queryFn: () => orderApiRequest.getList(params)
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
