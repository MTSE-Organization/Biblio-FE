'use client';

import { viewedProductApiRequest } from '@/api-requests';
import { BaseSearchType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useViewedProductListQuery = ({
  params,
  enabled
}: {
  params?: BaseSearchType;
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: ['viewed-product-list', params],
    queryFn: () => viewedProductApiRequest.getList(params),
    enabled
  });
};
