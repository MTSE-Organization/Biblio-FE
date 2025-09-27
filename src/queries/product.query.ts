import { productApiRequest } from '@/api-requests';
import { ProductSearchType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useProductListQuery = ({
  enabled = false,
  params
}: {
  params?: ProductSearchType;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['product-list', params],
    queryFn: () => productApiRequest.getList(params),
    enabled
  });
};

export const useTopDiscountProductListQuery = ({
  enabled = false
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['top-discount-product-list'],
    queryFn: () => productApiRequest.getTopDiscountList(),
    enabled
  });
};

export const useBestSellerProductListQuery = ({
  enabled = false
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['best-seller-product-list'],
    queryFn: () => productApiRequest.getBestSellerList(),
    enabled
  });
};

export const useLatestProductListQuery = ({
  enabled = false
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['latest-product-list'],
    queryFn: () => productApiRequest.getLatestList(),
    enabled
  });
};

export const useProductQuery = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApiRequest.getById(id)
  });
};

export const useFeaturedProductQuery = () => {
  return useQuery({
    queryKey: ['featured-product'],
    queryFn: () => productApiRequest.getFeature(),
    enabled: true
  });
};
