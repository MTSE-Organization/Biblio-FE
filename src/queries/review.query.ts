import { reviewApiRequest } from '@/api-requests';
import { ReviewBodyType, ReviewSearchType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateReviewMutation = () => {
  return useMutation({
    mutationKey: ['create-review'],
    mutationFn: (body: ReviewBodyType) => reviewApiRequest.create(body)
  });
};

export const useReviewListQuery = ({
  params,
  enabled
}: {
  params?: ReviewSearchType;
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: ['review-list', params],
    queryFn: () => reviewApiRequest.getList(params),
    enabled
  });
};
