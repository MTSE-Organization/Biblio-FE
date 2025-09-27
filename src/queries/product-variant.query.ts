import { productVariantApiRequest } from '@/api-requests';
import { ProductVariantSearchType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useProductVariantListQuery = ({
  params,
  enabled
}: {
  params?: ProductVariantSearchType;
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: ['product-variant-list', params],
    queryFn: () => productVariantApiRequest.getList(params),
    enabled
  });
};
