'use client';

import { useViewedProductListQuery } from '@/queries';
import { NoData } from '@/components/no-data';
import ViewedItemSkeleton from '@/app/user/viewed-history/_components/viewed-item-skeleton';
import ViewedItem from '@/app/user/viewed-history/_components/viewed-item';

export default function ViewedList() {
  const viewedProductQuery = useViewedProductListQuery({
    enabled: true
  });

  const viewedProducts = viewedProductQuery?.data?.data?.content;
  const loading = viewedProductQuery.isLoading;

  return (
    <>
      {loading ? (
        [...Array(8)].map((_, index) => <ViewedItemSkeleton key={index} />)
      ) : viewedProducts?.length == 0 ? (
        <NoData />
      ) : (
        viewedProducts?.map((product, index) => (
          <ViewedItem index={index} viewedProduct={product} key={product.id} />
        ))
      )}
    </>
  );
}
