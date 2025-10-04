import { productApiRequest } from '@/api-requests';
import { ProductSearchType } from '@/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

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
    queryFn: () => productApiRequest.getList({ isFeatured: true }),
    enabled: true
  });
};

export const useProductRelatedByCategoryQuery = ({
  id,
  enabled = false
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ['product-category', id],
    queryFn: () => productApiRequest.getListByCategory(id),
    enabled
  });
};

export const useTopViewProductListQuery = ({
  enabled = false
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['top-view-product-list'],
    queryFn: () => productApiRequest.getTopViewList(),
    enabled
  });
};

export const useInfiniteProductQuery = ({
  enabled = false,
  params
}: {
  params?: ProductSearchType;
  enabled: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: ['product-list', params],
    queryFn: ({ pageParam = 0 }) =>
      productApiRequest.getList({ ...params, page: pageParam }),
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
