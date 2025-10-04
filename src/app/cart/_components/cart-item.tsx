'use client';

import { product } from '@/assets';
import { Button } from '@/components/form';
import { productVariantConditions, productVariantFormats } from '@/constants';
import route from '@/routes';
import { useCartStore } from '@/store';
import { CartItemResType } from '@/types';
import { formatPrice, renderImageUrl } from '@/utils';
import { debounce } from 'lodash';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

function calcDiscountedPrice(item: CartItemResType) {
  const { modifiedPrice, product } = item.productVariant;
  if (!product.discount) {
    return {
      final: modifiedPrice,
      original: null,
      discount: null
    };
  }
  return {
    final: (modifiedPrice * (100 - product.discount)) / 100,
    original: modifiedPrice,
    discount: product.discount
  };
}

function CartItem({
  cartItem,
  onRemoveCartItem,
  onUpdateCartItem
}: {
  cartItem: CartItemResType;
  onRemoveCartItem: (id: string) => void;
  onUpdateCartItem: (id: string, quantity: number) => void;
}) {
  const { selectedCartItems, setSelectedCartItems } = useCartStore();
  const [quantity, setQuantity] = useState<number>(1);
  const isChecked = selectedCartItems.includes(cartItem.id);

  useEffect(() => {
    setQuantity(cartItem?.quantity ?? 1);
  }, [cartItem]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((id: string, q: number) => {
        onUpdateCartItem(id, q);
      }, 500),
    [onUpdateCartItem]
  );

  useEffect(() => () => debouncedUpdate.cancel(), [debouncedUpdate]);

  const handleIncreaseQuantity = useCallback(() => {
    setQuantity((prev) => {
      const newValue = prev + 1;
      debouncedUpdate(cartItem.id, newValue);
      return newValue;
    });
  }, [cartItem.id, debouncedUpdate]);

  const handleDecreaseQuantity = useCallback(() => {
    setQuantity((prev) => {
      if (prev === 1) return prev;
      const newValue = prev - 1;
      debouncedUpdate(cartItem.id, newValue);
      return newValue;
    });
  }, [cartItem.id, debouncedUpdate]);

  const handleChangeQuantity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;
      setQuantity(value);
      debouncedUpdate(cartItem.id, value);
    },
    [cartItem.id, debouncedUpdate]
  );

  const handleToggleSelect = useCallback(() => {
    const newSelected = isChecked
      ? selectedCartItems.filter((id) => id !== cartItem.id)
      : [...selectedCartItems, cartItem.id];

    setSelectedCartItems(newSelected);
  }, [isChecked, selectedCartItems, cartItem.id, setSelectedCartItems]);

  const { final, original, discount } = useMemo(
    () => calcDiscountedPrice(cartItem),
    [cartItem]
  );

  return (
    <div className='flex items-center pl-6'>
      <div className='text-center'>
        <div className='inline-flex items-center'>
          <label className='relative flex cursor-pointer items-center'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleToggleSelect}
              className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
            />
            <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                />
              </svg>
            </span>
          </label>
        </div>
      </div>

      <div className='flex flex-1 p-4 font-semibold'>
        <Link
          className='shrink-0'
          href={`${route.book}/${cartItem.productVariant.product.slug}.${cartItem.productVariant.product.id}`}
        >
          <Image
            className='h-25 w-20 rounded-sm object-cover'
            src={
              cartItem.productVariant.imageUrl
                ? renderImageUrl(cartItem.productVariant.imageUrl)
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
            href={`${route.book}/${cartItem.productVariant.product.slug}.${cartItem.productVariant.product.id}`}
            className='hover:text-green-primary leading-6 font-medium transition-all duration-200 ease-linear'
            title={cartItem.productVariant.product.name}
          >
            {cartItem.productVariant.product.name}
          </Link>
          <div>
            <p className='font-medium text-gray-400'>
              Phân loại: &nbsp;
              {
                productVariantConditions.find(
                  (pvc) => pvc.value === cartItem.productVariant.condition
                )?.label
              }
              &nbsp; & &nbsp;
              {
                productVariantFormats.find(
                  (pvf) => pvf.value === cartItem.productVariant.format
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

      <div className='py-4 text-center'>
        <div className='focus-within:ring-green-primary mx-auto mt-[5px] flex h-7.5 w-22.5 items-center justify-between rounded-sm border border-1 transition-all duration-200 ease-linear focus-within:border-transparent focus-within:ring-2'>
          <Button
            type='button'
            onClick={handleDecreaseQuantity}
            variant='ghost'
            className='hover:text-green-primary ml-1 flex h-full w-5 cursor-pointer items-center justify-center p-0! transition-all duration-200 ease-linear hover:bg-transparent'
          >
            <Minus />
          </Button>
          <input
            type='text'
            value={quantity}
            onChange={handleChangeQuantity}
            className='w-[40px] text-center focus:border-none focus:outline-none'
          />
          <Button
            type='button'
            onClick={handleIncreaseQuantity}
            variant='ghost'
            className='hover:text-green-primary mr-1 flex h-full w-5 cursor-pointer items-center justify-center p-0! transition-all duration-200 ease-linear hover:bg-transparent'
          >
            <Plus />
          </Button>
        </div>
      </div>

      <div className='basis-[18%] p-4 text-center'>
        <p className='text-green-primary text-base font-semibold'>
          {formatPrice(cartItem.quantity * final)}
        </p>
      </div>

      <div className='basis-[5%] p-4 text-center'>
        <button
          onClick={() => onRemoveCartItem(cartItem.id)}
          className='cursor-pointer transition-all duration-200 ease-linear hover:text-red-500'
        >
          <RiDeleteBin6Line size={20} />
        </button>
      </div>
    </div>
  );
}

export default React.memo(CartItem);
