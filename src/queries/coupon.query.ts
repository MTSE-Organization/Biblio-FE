import { couponApiRequest } from '@/api-requests';
import { CouponSearchType } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useCouponListQuery = ({
  params,
  enabled
}: {
  params?: CouponSearchType;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['coupon-list', params],
    queryFn: () => couponApiRequest.getList(params),
    enabled: enabled,
    placeholderData: keepPreviousData
  });
};

export const useCouponQuery = (id: string) => {
  return useQuery({
    queryKey: ['coupon', id],
    queryFn: () => couponApiRequest.getById(id)
  });
};
