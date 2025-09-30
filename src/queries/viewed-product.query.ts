'use client';

import { viewedProductApiRequest } from '@/api-requests';
import { useMutation } from '@tanstack/react-query';

export const useViewedProductMutation = () => {
  return useMutation({
    mutationKey: ['viewed-product-create'],
    mutationFn: (body: { productId: string }) =>
      viewedProductApiRequest.create(body)
  });
};
