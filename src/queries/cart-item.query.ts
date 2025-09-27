import { cartItemApiRequest } from '@/api-requests';
import { useMutation } from '@tanstack/react-query';

export const useDeleteItemMutation = () => {
  return useMutation({
    mutationKey: ['delete-item'],
    mutationFn: async (id: string) => await cartItemApiRequest.deleteItem(id)
  });
};
