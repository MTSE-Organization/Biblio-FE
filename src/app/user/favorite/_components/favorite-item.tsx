import { product } from '@/assets';
import { StarRating } from '@/components/star-rating';
import { logger } from '@/logger';
import { useDeleteFavoriteProductMutation } from '@/queries';
import route from '@/routes';
import { FavoriteProductResType } from '@/types';
import { formatPrice, notify, renderImageUrl } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function FavoriteItem({
  favorite
}: {
  favorite: FavoriteProductResType;
}) {
  const deleteFavoriteProductMutation = useDeleteFavoriteProductMutation();
  const queryClient = useQueryClient();

  const handleRemoveFavorite = async () => {
    if (!favorite?.id) return;
    await deleteFavoriteProductMutation.mutateAsync(favorite?.id, {
      onSuccess: () => {
        // notify.success('Xóa sách khỏi yêu thích thành công');
        queryClient.invalidateQueries({ queryKey: ['favorite-product-list'] });
      },
      onError: (error) => {
        notify.error('Đã có lỗi xảy ra');
        logger.error('Error while adding to cart:', error);
      }
    });
  };

  return (
    <div className='relative mb-5 flex gap-5 rounded-lg border border-gray-200 bg-white p-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
      <div className='flex-shrink-0'>
        <Image
          src={
            favorite?.product?.image?.url
              ? renderImageUrl(favorite?.product?.image?.url)
              : product.src
          }
          width={100}
          height={100}
          alt='Sản phẩm'
          className='rounded-lg object-contain'
        />
      </div>
      <div>
        <Link
          href={`${route.book}/${favorite.product.slug}.${favorite.product.id}`}
          className='hover:text-green-primary mb-3 line-clamp-1 leading-6 font-medium break-all transition-all duration-200 ease-linear'
          title={favorite.product.name}
          // onClick={handleClick}
        >
          {favorite.product.name}
        </Link>
        <div className='mb-3 flex items-center gap-3'>
          <Link
            href={`${route.category}/${favorite?.product?.category.slug}.${favorite?.product?.category.id}`}
            title={favorite?.product?.category.name}
            className='hover:text-green-primary line-clamp-1 text-sm text-gray-500 transition-all duration-200 ease-linear'
          >
            {favorite?.product?.category.name}
          </Link>
          <div className='flex items-center justify-center'>
            <StarRating value={20} />
          </div>
        </div>
        {favorite?.product?.discount === 0 && (
          <p className='text-green-primary text-base font-bold'>
            {formatPrice(favorite?.product?.price)}
          </p>
        )}
        {favorite?.product?.discount !== 0 && (
          <div className='flex items-center gap-2'>
            <p className='text-green-primary text-base font-bold'>
              {formatPrice(
                (favorite?.product?.price *
                  (100 - favorite?.product?.discount)) /
                  100
              )}
            </p>
            <p className='font-bold text-gray-400 line-through'>
              {formatPrice(favorite?.product?.price)}
            </p>
            <p className='bg-green-primary rounded p-1 text-xs text-white'>
              -{favorite?.product?.discount} %
            </p>
          </div>
        )}
      </div>
      <div
        onClick={handleRemoveFavorite}
        className='absolute right-5 bottom-5 flex cursor-pointer items-center gap-1 text-gray-600'
      >
        <Heart className='scale-100 fill-red-500 text-red-500 transition-all duration-300 hover:scale-125' />
        <span>Yêu thích</span>
      </div>
    </div>
  );
}
