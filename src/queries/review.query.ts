import { reviewApiRequest } from '@/api-requests';
import { ReviewBodyType } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useCreateReviewMutation = () => {
  return useMutation({
    mutationKey: ['create-review'],
    mutationFn: (body: ReviewBodyType) => reviewApiRequest.create(body)
  });
};
