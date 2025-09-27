'use client';

import { useState } from 'react';
import { Button } from '@/components/form';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { emptyCart, product } from '@/assets';
import Link from 'next/link';
import route from '@/routes';
import { useCartQuery } from '@/queries/cart.query';
import { storageKeys } from '@/constants';
import { formatPrice, getData, notify, renderImageUrl } from '@/utils';
import { CartItemResType } from '@/types';
import { useDeleteItemMutation } from '@/queries';
import { useQueryClient } from '@tanstack/react-query';

const CartItem = ({
  cartItem,
  onRemoveCartItem
}: {
  cartItem: CartItemResType;
  onRemoveCartItem: (id: string) => void;
}) => {
  return (
    <li className='mb-5 flex border-b pb-5'>
      <Link
        className='m-auto basis-6/24'
        href={`${route.book}/${cartItem?.productVariant?.product?.slug}.${cartItem?.productVariant?.product?.id}`}
      >
        <Image
          className='rounded-sm'
          src={
            cartItem?.productVariant?.imageUrl
              ? renderImageUrl(cartItem?.productVariant?.imageUrl)
              : product
          }
          width={100}
          height={100}
          alt='Product'
        />
      </Link>
      <div className='flex basis-18/24 flex-col pl-4'>
        <div className='mb-1 flex items-center justify-center gap-2.5'>
          <Link
            href={`${route.book}/${cartItem?.productVariant?.product?.slug}.${cartItem?.productVariant?.product?.id}`}
            className='hover:text-green-primary line-clamp-1 leading-6 font-medium break-all transition-all duration-200 ease-linear'
            title={cartItem?.productVariant?.product?.name}
          >
            {cartItem?.productVariant?.product?.name}
          </Link>
          <button
            className='cursor-pointer hover:text-red-500'
            onClick={() => onRemoveCartItem(cartItem?.id)}
          >
            <FaTimes size={12} />
          </button>
        </div>
        {cartItem?.productVariant?.product?.discount === 0 && (
          <p className='text-green-primary text-xs font-bold'>
            {formatPrice(cartItem?.productVariant?.product?.price)} ₫
          </p>
        )}
        {cartItem?.productVariant?.product?.discount !== 0 && (
          <div className='flex items-center gap-2 text-xs'>
            <p className='text-green-primary font-bold'>
              {formatPrice(
                (cartItem?.productVariant?.product?.price *
                  (100 - cartItem?.productVariant?.product?.discount)) /
                  100
              )}{' '}
              ₫
            </p>
            <p className='font-bold text-gray-400 line-through'>
              {formatPrice(cartItem?.productVariant?.product?.price)} ₫
            </p>
            <p className='bg-green-primary rounded p-1 text-xs text-white'>
              -{cartItem?.productVariant?.product?.discount} %
            </p>
          </div>
        )}
        <div className='mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
          <button className='flex w-[25px] cursor-pointer items-center justify-center'>
            -
          </button>
          <input
            type='text'
            defaultValue={cartItem.quantity}
            minLength={1}
            maxLength={20}
            className='w-[30px] text-center'
          />
          <button className='flex w-[25px] cursor-pointer items-center justify-center'>
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default function CartSidebar() {
  const [open, setOpen] = useState(false);
  const accessToken = getData(storageKeys.ACCESS_TOKEN);

  const cartQuery = useCartQuery({
    enabled: open && !!accessToken
  });

  const queryClient = useQueryClient();

  const cart = cartQuery?.data?.data;

  const removeFromCartMutation = useDeleteItemMutation();

  const handleRemoveFromCart = (id: string) => {
    removeFromCartMutation.mutateAsync(id, {
      onSuccess: () => {
        notify.success('Xóa sản phẩm khỏi giỏ hàng thàng công');
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      },
      onError: (error) => {
        notify.error('Đã có lỗi xảy ra');
        console.log(error);
      }
    });
  };

  return (
    <div>
      <Button
        variant='ghost'
        onClick={() => setOpen(true)}
        className='over:text-green-primary group size-full rounded-full p-0! hover:bg-transparent! focus:outline-none focus-visible:ring-0'
      >
        <div className='relative'>
          <RiShoppingCartLine className='size-[21px]' />
          <div className='group-hover:bg-green-primary absolute -top-1.5 left-2.5 flex items-center justify-center rounded-full bg-black p-1 py-0 text-xs text-white transition-all duration-200 ease-linear'>
            0
          </div>
        </div>
        Giỏ hàng
      </Button>

      {/* Overlay + Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className='fixed inset-0 z-40 bg-black'
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='fixed top-0 right-0 z-50 flex h-full w-85 flex-col bg-white shadow-lg'
            >
              <div className='flex items-center justify-between border-b p-4'>
                <h2 className='text-lg font-semibold'>Giỏ hàng</h2>
                <button
                  onClick={() => setOpen(false)}
                  className='cursor-pointer p-2 hover:text-red-500'
                >
                  <FaTimes />
                </button>
              </div>

              {!accessToken ? (
                <div className='flex flex-1 flex-col items-center justify-center overflow-y-auto p-4'>
                  <p className='text-gray-500'>
                    Vui lòng{' '}
                    <Link
                      className='text-green-primary transition-all duration-200 ease-linear hover:opacity-80'
                      href={route.login}
                    >
                      đăng nhập
                    </Link>{' '}
                    để xem giỏ hàng
                  </p>
                  <Image
                    src={emptyCart.src}
                    alt='Empty Cart'
                    width={200}
                    height={200}
                  />
                </div>
              ) : !cart?.cartItems?.length ? (
                <div className='flex flex-1 flex-col items-center justify-center overflow-y-auto p-4'>
                  <p className='text-gray-500'>Giỏ hàng của bạn đang trống</p>
                  <Image
                    src={emptyCart.src}
                    alt='Empty Cart'
                    width={200}
                    height={200}
                  />
                </div>
              ) : (
                <ul className='h-full overflow-auto px-5 pt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                  {cart?.cartItems?.map((cartItem) => (
                    <CartItem
                      key={cartItem?.id}
                      cartItem={cartItem}
                      onRemoveCartItem={handleRemoveFromCart}
                    />
                  ))}
                </ul>
              )}

              <div className='border-t p-5'>
                <Button variant={'primary'} className='w-full text-white'>
                  <Link href={route.cart}>Xem giỏ hàng</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
