import { favoriteApiRequest } from '@/api-requests';
import { FavoriteProductSearchType } from '@/types';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

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

export const useInfiniteFavoriteProductListQuery = ({
  params,
  enabled
}: {
  params?: FavoriteProductSearchType;
  enabled?: boolean;
} = {}) => {
  return useInfiniteQuery({
    queryKey: ['favorite-product-list'],
    queryFn: ({ pageParam = 0 }) =>
      favoriteApiRequest.getList({ ...params, page: pageParam }),
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
