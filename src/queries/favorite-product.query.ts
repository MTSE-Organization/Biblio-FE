import { favoriteApiRequest } from '@/api-requests';
import { FavoriteProductSearchType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useFavoriteProductListQuery = ({
  params,
  enabled
}: {
  params?: FavoriteProductSearchType;
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: ['favorite-product-list', params],
    queryFn: () => favoriteApiRequest.getList(params),
    enabled
  });
};

export const useAddFavoriteProductMutation = () => {
  return useMutation({
    mutationKey: ['create-favorite-product'],
    mutationFn: (body: { productId: string }) =>
      favoriteApiRequest.addFavoriteProduct(body)
  });
};

export const useDeleteFavoriteProductMutation = () => {
  return useMutation({
    mutationKey: ['delete-favorite-product'],
    mutationFn: (id: string) => favoriteApiRequest.deleteFavoriteProduct(id)
  });
};
