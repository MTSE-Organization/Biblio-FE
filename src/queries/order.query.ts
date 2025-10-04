import { orderApiRequest } from '@/api-requests';
import { OrderBodyType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useOrderQuery = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApiRequest.getById(id)
  });
};

export const usePlaceOrderMutation = () => {
  return useMutation({
    mutationKey: ['order-place'],
    mutationFn: (body: OrderBodyType) => orderApiRequest.place(body)
  });
};
