'use client';

import { useInfiniteFavoriteProductListQuery } from '@/queries';
import FavoriteItem from './favorite-item';
import { NoData } from '@/components/no-data';
import FavoriteItemSkeleton from '@/app/user/favorite/_components/favorite-item-skeleton';
import { useEffect, useRef } from 'react';
import { DotLoading } from '@/components/loading';

export default function FavoriteList() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteFavoriteProductListQuery({
      enabled: true,
      params: {
        size: 8
      }
    });

  const favoriteProducts =
    data?.pages.flatMap((page) => page.data.content) || [];

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
        [...Array(8)].map((_, index) => <FavoriteItemSkeleton key={index} />)
      ) : favoriteProducts?.length == 0 ? (
        <NoData />
      ) : (
        <div className='flex flex-col gap-y-4'>
          {favoriteProducts?.map((product, index) => (
            <FavoriteItem index={index} favorite={product} key={product.id} />
          ))}
        </div>
      )}
      <div ref={loadMoreRef} className='flex items-center justify-center'>
        {isFetchingNextPage && <DotLoading />}
      </div>
    </>
  );
}
