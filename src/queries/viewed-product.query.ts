'use client';

import { viewedProductApiRequest } from '@/api-requests';
import { BaseSearchType } from '@/types';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

export const useViewedProductMutation = () => {
  return useMutation({
    mutationKey: ['viewed-product-create'],
    mutationFn: (body: { productId: string }) =>
      viewedProductApiRequest.create(body)
  });
};

export const useDeleteViewedProductMutation = () => {
  return useMutation({
    mutationKey: ['delete-viewed-product'],
    mutationFn: (id: string) => viewedProductApiRequest.delete(id)
  });
};

export const useInfiniteViewedProductListQuery = ({
  params,
  enabled
}: {
  params?: BaseSearchType;
  enabled?: boolean;
} = {}) => {
  return useInfiniteQuery({
    queryKey: ['viewed-product-list', params],
    queryFn: ({ pageParam = 0 }) =>
      viewedProductApiRequest.getList({ ...params, page: pageParam }),
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
