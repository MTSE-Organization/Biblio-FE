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
    queryKey: ['category-list', params],
    queryFn: () => categoryApiRequest.getList(params),
    enabled
  });
};

export const useCategoryQuery = ({
  id,
  enabled
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryApiRequest.getById(id),
    enabled
  });
};

export const useCategoryAutoCompleteQuery = ({
  params,
  enabled = true
}: {
  params?: CategorySearchType;
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: ['category-auto-complete', params],
    queryFn: () => categoryApiRequest.autoComplete(params),
    enabled
  });
};
