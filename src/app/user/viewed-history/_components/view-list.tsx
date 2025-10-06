'use client';

import { useViewedProductListQuery } from '@/queries';

import { NoData } from '@/components/no-data';
import FavoriteItemSkeleton from '@/app/user/favorite/_components/favorite-item-skeleton';
import ViewedItem from './viewed-item';

export default function ViewedList() {
  const viewedProductQuery = useViewedProductListQuery({
    enabled: true
  });

  const viewedProducts = viewedProductQuery?.data?.data?.content;
  const loading = viewedProductQuery.isLoading || viewedProductQuery.isFetching;

  return (
    <>
      {loading ? (
        [...Array(4)].map((_, index) => <FavoriteItemSkeleton key={index} />)
      ) : viewedProducts?.length == 0 ? (
        <NoData />
      ) : (
        viewedProducts?.map((product, index) => (
          <ViewedItem viewedProduct={product} key={index} />
        ))
      )}
    </>
  );
}
