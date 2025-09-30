import { categoryApiRequest } from '@/api-requests';
import { CategorySearchType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useCategoryListQuery = ({
  params,
  enabled = true
}: {
  params?: CategorySearchType;
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: ['category-list'],
    queryFn: () => categoryApiRequest.getList(params),
    enabled
  });
};
