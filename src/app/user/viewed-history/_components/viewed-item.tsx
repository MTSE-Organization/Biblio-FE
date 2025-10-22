'use client';

import { product } from '@/assets';
import { StarRating } from '@/components/star-rating';
import { logger } from '@/logger';
import { useDeleteViewedProductMutation } from '@/queries';
import route from '@/routes';
import { useAppLoadingStore } from '@/store/use-app-loading-store';
import { ViewedProductResType } from '@/types';
import { formatPrice, notify, renderImageUrl } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export default function ViewedItem({
  viewedProduct,
  index
}: {
  viewedProduct: ViewedProductResType;
  index: number;
}) {
  const { withLoading } = useAppLoadingStore();
  const deleteViewedProductMutation = useDeleteViewedProductMutation();
  const queryClient = useQueryClient();

  const handleRemoveViewedProduct = async () => {
    if (!viewedProduct?.id) return;
    await withLoading(
      deleteViewedProductMutation.mutateAsync(viewedProduct?.id, {
        onSuccess: () => {
          notify.success('Xóa sách khỏi lịch sử xem thành công');
          queryClient.invalidateQueries({
            queryKey: ['viewed-product-list']
          });
        },
        onError: (error) => {
          notify.error('Đã có lỗi xảy ra');
          logger.error('Error while deleting from viewed history:', error);
        }
      })
    );
  };

  return (
    <div className='relative flex gap-5 rounded-lg border border-gray-200 bg-white p-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
      <div className='flex-shrink-0'>
        <Image
          src={
            viewedProduct?.product?.image?.url
              ? renderImageUrl(viewedProduct?.product?.image?.url)
              : product.src
          }
          width={100}
          height={100}
          alt='Sản phẩm'
          className='h-25 w-25 rounded-lg object-contain'
        />
      </div>
      <div>
        <Link
          href={`${route.book}/${viewedProduct.product.slug}.${viewedProduct.product.id}`}
          className='hover:text-green-primary mb-3 line-clamp-1 leading-6 font-medium break-all transition-all duration-200 ease-linear'
          title={viewedProduct.product.name}
        >
          {viewedProduct.product.name}
        </Link>
        <div className='mb-3 flex items-center gap-3'>
          <Link
            href={`${route.category}/${viewedProduct?.product?.category.slug}.${viewedProduct?.product?.category.id}`}
            title={viewedProduct?.product?.category.name}
            className='hover:text-green-primary line-clamp-1 text-sm text-gray-500 transition-all duration-200 ease-linear'
          >
            {viewedProduct?.product?.category.name}
          </Link>
          <div className='flex items-center justify-center'>
            <StarRating value={viewedProduct?.product?.averageReview} />
          </div>
        </div>
        {viewedProduct?.product?.discount === 0 && (
          <p className='text-green-primary text-base font-bold'>
            {formatPrice(viewedProduct?.product?.price)}
          </p>
        )}
        {viewedProduct?.product?.discount !== 0 && (
          <div className='flex items-center gap-2'>
            <p className='text-green-primary text-base font-bold'>
              {formatPrice(
                (viewedProduct?.product?.price *
                  (100 - viewedProduct?.product?.discount)) /
                  100
              )}
            </p>
            <p className='font-bold text-gray-400 line-through'>
              {formatPrice(viewedProduct?.product?.price)}
            </p>
            <p className='bg-green-primary rounded p-1 text-xs text-white'>
              -{viewedProduct?.product?.discount} %
            </p>
          </div>
        )}
      </div>
      <div
        onClick={handleRemoveViewedProduct}
        className='absolute right-5 bottom-5 flex cursor-pointer items-center gap-1 text-gray-600'
      >
        <RiDeleteBin6Fill
          size={20}
          className='scale-100 fill-red-500 text-red-500 transition-all duration-300'
        />
        <span>Xóa</span>
      </div>
    </div>
  );
}
