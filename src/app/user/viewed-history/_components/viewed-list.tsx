'use client';
import { NoData } from '@/components/no-data';
import ViewedItemSkeleton from '@/app/user/viewed-history/_components/viewed-item-skeleton';
import ViewedItem from '@/app/user/viewed-history/_components/viewed-item';
import { useInfiniteViewedProductListQuery } from '@/queries';
import { useEffect, useRef } from 'react';
import { DotLoading } from '@/components/loading';

export default function ViewedList() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteViewedProductListQuery({
      enabled: true,
      params: {
        size: 8
      }
    });

  const viewedProducts = data?.pages.flatMap((page) => page.data.content) || [];

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {isLoading ? (
        [...Array(8)].map((_, index) => <ViewedItemSkeleton key={index} />)
      ) : viewedProducts?.length == 0 ? (
        <NoData />
      ) : (
        <div className='flex flex-col gap-y-4'>
          {viewedProducts?.map((product, index) => (
            <ViewedItem
              index={index}
              viewedProduct={product}
              key={product.id}
            />
          ))}
        </div>
      )}
      <div ref={loadMoreRef} className='flex items-center justify-center'>
        {isFetchingNextPage && <DotLoading />}
      </div>
    </>
  );
}
