'use client';

import { useFavoriteProductListQuery } from '@/queries';
import FavoriteItem from './favorite-item';
import Image from 'next/image';
import { emptyList } from '@/assets';

export default function FavoriteList() {
  const favoriteQuery = useFavoriteProductListQuery({
    enabled: true
  });

  const favoriteProducts = favoriteQuery?.data?.data?.content;

  if (!favoriteProducts?.length) {
    return (
      <div className='flex flex-1 flex-col items-center justify-center p-4'>
        <p className='text-gray-500'>Không có sản phẩm nào</p>
        <Image src={emptyList.src} alt='Empty List' width={200} height={200} />
      </div>
    );
  }

  return (
    <>
      {favoriteProducts?.map((favorite, index) => (
        <FavoriteItem favorite={favorite} key={index} />
      ))}
    </>
  );
}
