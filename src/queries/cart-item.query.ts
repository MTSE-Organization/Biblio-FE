import { cartItemApiRequest } from '@/api-requests';
import { useMutation } from '@tanstack/react-query';

export const useDeleteItemMutation = () => {
  return useMutation({
    mutationKey: ['delete-item'],
    mutationFn: (id: string) => cartItemApiRequest.deleteItem(id)
  });
};

export const useUpdateCartItemMutation = () => {
  return useMutation({
    mutationKey: ['update-cart-item'],
    mutationFn: (body: { id: string; quantity: number }) =>
      cartItemApiRequest.updateCartItem(body)
  });
};
