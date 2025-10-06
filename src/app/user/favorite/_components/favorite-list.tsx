'use client';

import { useFavoriteProductListQuery } from '@/queries';
import FavoriteItem from './favorite-item';
import { NoData } from '@/components/no-data';
import FavoriteItemSkeleton from '@/app/user/favorite/_components/favorite-item-skeleton';

export default function FavoriteList() {
  const favoriteQuery = useFavoriteProductListQuery({
    enabled: true
  });

  const favoriteProducts = favoriteQuery?.data?.data?.content;
  const loading = favoriteQuery.isLoading || favoriteQuery.isFetching;

  return (
    <>
      {loading ? (
        [...Array(4)].map((_, index) => <FavoriteItemSkeleton key={index} />)
      ) : favoriteProducts?.length == 0 ? (
        <NoData />
      ) : (
        favoriteProducts?.map((favorite, index) => (
          <FavoriteItem favorite={favorite} key={index} />
        ))
      )}
    </>
  );
}
