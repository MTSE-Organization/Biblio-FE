import { cartApiRequest } from '@/api-requests';
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
    mutationFn: async (body: { productVariantId: string; quantity: number }) =>
      await cartApiRequest.addItem(body)
  });
};
