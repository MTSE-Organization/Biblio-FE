'use client';

import { product } from '@/assets';
import { productVariantConditions, productVariantFormats } from '@/constants';
import route from '@/routes';
import { OrderItemResType } from '@/types';
import { formatPrice, renderImageUrl } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

function calcDiscountedPrice(item: OrderItemResType) {
  const { modifiedPrice, product } = item.productVariant;
  if (!product.discount) {
    return {
      final: +modifiedPrice + +product.price,
      original: null,
      discount: null
    };
  }
  return {
    final: ((+modifiedPrice + +product.price) * (100 - product.discount)) / 100,
    original: +modifiedPrice + +product.price,
    discount: product.discount
  };
}

export default function OrderItem({
  orderItem
}: {
  orderItem: OrderItemResType;
}) {
  const { final, original, discount } = useMemo(
    () => calcDiscountedPrice(orderItem),
    [orderItem]
  );
  return (
    <div className='flex items-center pl-6'>
      <div className='flex flex-1 p-4 font-semibold'>
        <Link
          className='shrink-0'
          href={`${route.book}/${orderItem.productVariant.product.slug}.${orderItem.productVariant.product.id}`}
        >
          <Image
            className='h-25 w-20 rounded-sm object-cover'
            src={
              orderItem.productVariant.imageUrl
                ? renderImageUrl(orderItem.productVariant.imageUrl)
                : product
            }
            width={100}
            height={200}
            unoptimized
            alt='Product'
          />
        </Link>
        <div className='flex flex-col justify-between pl-4'>
          <Link
            href={`${route.book}/${orderItem.productVariant.product.slug}.${orderItem.productVariant.product.id}`}
            className='hover:text-green-primary leading-6 font-medium transition-all duration-200 ease-linear'
            title={orderItem.productVariant.product.name}
          >
            {orderItem.productVariant.product.name}
          </Link>
          <div>
            <p className='font-medium text-gray-400'>
              Phân loại: &nbsp;
              {
                productVariantConditions.find(
                  (pvc) => pvc.value === orderItem.productVariant.condition
                )?.label
              }
              &nbsp; & &nbsp;
              {
                productVariantFormats.find(
                  (pvf) => pvf.value === orderItem.productVariant.format
                )?.label
              }
            </p>
            {!discount && (
              <p className='text-green-primary text-base font-bold'>
                {formatPrice(final)}
              </p>
            )}
            {discount && (
              <div className='flex items-center gap-2'>
                <p className='text-green-primary text-base font-bold'>
                  {formatPrice(final)}
                </p>
                <p className='text-xs font-bold text-gray-400 line-through'>
                  {formatPrice(original!)}
                </p>
                <p className='bg-green-primary rounded p-1 text-xs text-white'>
                  -{discount} %
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='w-22.5 py-4 text-center'>
        <span>{orderItem.quantity}</span>
      </div>
      <div className='basis-[18%] p-4 text-center'>
        <p className='text-green-primary text-base font-semibold'>
          {formatPrice(orderItem.quantity * final)}
        </p>
      </div>
    </div>
  );
}
