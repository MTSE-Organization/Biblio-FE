import { cartApiRequest } from '@/api-requests';
import { CartCheckoutBodyType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCartQuery = ({ enabled = false }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApiRequest.getCart(),
    enabled
  });
};

export const useAddItemMutation = () => {
  return useMutation({
    mutationKey: ['add-item'],
    mutationFn: (body: { productVariantId: string; quantity: number }) =>
      cartApiRequest.addItem(body)
  });
};

export const useCartCheckMutation = () => {
  return useMutation({
    mutationKey: ['cart-checkout'],
    mutationFn: (body: CartCheckoutBodyType) => cartApiRequest.checkout(body)
  });
};
