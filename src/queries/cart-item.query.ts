import { cartItemApiRequest } from '@/api-requests';
import { useMutation } from '@tanstack/react-query';

export const useDeleteItemMutation = () => {
  return useMutation({
    mutationKey: ['delete-item'],
    mutationFn: async (id: string) => await cartItemApiRequest.deleteItem(id)
  });
};

export const useUpdateCartItemMutation = () => {
  return useMutation({
    mutationKey: ['update-cart-item'],
    mutationFn: async (body: { id: string; quantity: number }) =>
      await cartItemApiRequest.updateCartItem(body)
  });
};
