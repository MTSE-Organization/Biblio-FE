'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/form';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { emptyCart, product } from '@/assets';
import Link from 'next/link';
import route from '@/routes';
import { useCartQuery } from '@/queries/cart.query';
import { formatPrice, notify, renderImageUrl } from '@/utils';
import { CartItemResType } from '@/types';
import { useDeleteItemMutation, useUpdateCartItemMutation } from '@/queries';
import { useQueryClient } from '@tanstack/react-query';
import { logger } from '@/logger';
import { useAuthStore } from '@/store';
import { cn } from '@/lib';
import { debounce } from 'lodash';
import { productVariantConditions, productVariantFormats } from '@/constants';
import { HamsterLoading } from '@/components/loading';
import { Minus, Plus } from 'lucide-react';
import { useAppLoadingStore } from '@/store/use-app-loading-store';

function CartItem({
  cartItem,
  onRemoveCartItem,
  onUpdateCartItem,
  onClose
}: {
  cartItem: CartItemResType;
  onRemoveCartItem: (id: string) => void;
  onUpdateCartItem: (id: string, quantity: number) => void;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setQuantity(cartItem?.quantity ?? 1);
  }, [cartItem]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((id: string, quantity: number) => {
        onUpdateCartItem(id, quantity);
      }, 500),
    [onUpdateCartItem]
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => {
      const newValue = prev + 1;
      debouncedUpdate(cartItem.id, newValue);
      return newValue;
    });
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) return prev;
      const newValue = prev - 1;
      debouncedUpdate(cartItem.id, newValue);
      return newValue;
    });
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    setQuantity(value);
    debouncedUpdate(cartItem.id, value);
  };

  const getPrice = (price: string | number, discount: number = 0) => {
    return formatPrice((+price * (100 - discount)) / 100);
  };

  return (
    <li className='mb-5 flex border-b pb-5'>
      <Link
        className='m-auto basis-6/24'
        href={`${route.book}/${cartItem?.productVariant?.product?.slug}.${cartItem?.productVariant?.product?.id}`}
        onClick={onClose}
      >
        <Image
          className='h-25 w-20 rounded-sm object-cover'
          src={
            cartItem?.productVariant?.imageUrl
              ? renderImageUrl(cartItem?.productVariant?.imageUrl)
              : product
          }
          width={100}
          height={200}
          unoptimized
          alt='Product'
        />
      </Link>
      <div className='flex basis-18/24 flex-col pl-4'>
        <div className='relative mb-1 flex items-center gap-2.5'>
          <Link
            href={`${route.book}/${cartItem?.productVariant?.product?.slug}.${cartItem?.productVariant?.product?.id}`}
            className='hover:text-green-primary line-clamp-1 leading-6 font-medium break-all transition-all duration-200 ease-linear'
            title={cartItem?.productVariant?.product?.name}
          >
            {cartItem?.productVariant?.product?.name}
          </Link>
          <Button
            variant={'ghost'}
            className='absolute -top-2 -right-5.5 size-2 cursor-pointer p-0 hover:text-red-500'
            onClick={() => onRemoveCartItem(cartItem?.id)}
          >
            <FaTimes size={12} />
          </Button>
        </div>
        {cartItem?.productVariant?.product?.discount === 0 && (
          <p className='text-green-primary text-base font-bold'>
            {getPrice(
              cartItem.quantity *
                (+cartItem.productVariant.modifiedPrice +
                  +cartItem.productVariant.product.price)
            )}
          </p>
        )}
        {cartItem?.productVariant?.product?.discount !== 0 && (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col text-right'>
              <p className='text-green-primary text-base font-bold'>
                {getPrice(
                  cartItem.quantity *
                    (+cartItem.productVariant.modifiedPrice +
                      +cartItem.productVariant.product.price),
                  cartItem.productVariant.product.discount
                )}
              </p>
              <p className='text-sm font-bold text-gray-400 line-through'>
                {getPrice(
                  cartItem.quantity *
                    (+cartItem.productVariant.modifiedPrice +
                      +cartItem.productVariant.product.price)
                )}
              </p>
            </div>
            <p className='bg-green-primary rounded p-1 text-xs text-white'>
              -{cartItem?.productVariant?.product?.discount} %
            </p>
          </div>
        )}
        <p className='mt-1 text-gray-500'>
          {
            productVariantConditions.find(
              (pvc) => pvc.value === cartItem.productVariant.condition
            )?.label
          }
          &nbsp; &&nbsp;
          {
            productVariantFormats.find(
              (pvf) => pvf.value === cartItem.productVariant.format
            )?.label
          }
        </p>
        <div className='mt-[5px] flex h-[25px] w-[90px] items-center justify-between rounded-sm border'>
          <Button
            onClick={handleDecreaseQuantity}
            variant={'ghost'}
            className='hover:text-green-primary ml-1 flex h-full w-5 cursor-pointer items-center justify-center p-0! transition-all duration-200 ease-linear'
          >
            <Minus />
          </Button>
          <input
            type='text'
            value={quantity}
            onChange={handleChangeQuantity}
            minLength={1}
            maxLength={cartItem.productVariant.quantity}
            className='w-[40px] text-center'
          />
          <Button
            onClick={handleIncreaseQuantity}
            variant={'ghost'}
            className='hover:text-green-primary mr-1 flex h-full w-5 cursor-pointer items-center justify-center p-0! transition-all duration-200 ease-linear'
          >
            <Plus />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default function CartSidebar() {
  const [open, setOpen] = useState(false);
  const { profile } = useAuthStore();

  const cartQuery = useCartQuery({
    enabled: !!profile
  });
  const { withLoading } = useAppLoadingStore();

  const loading = cartQuery.isLoading;

  const queryClient = useQueryClient();

  const cart = cartQuery?.data?.data;
  const cartItemQuantity = cart?.cartItems.length ?? 0;

  const removeFromCartMutation = useDeleteItemMutation();
  const updateCartItem = useUpdateCartItemMutation();

  const handleRemoveFromCart = async (id: string) => {
    await withLoading(
      removeFromCartMutation.mutateAsync(id, {
        onSuccess: () => {
          notify.success('Xóa sách khỏi giỏ hàng thàng công');
          queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
          notify.error('Đã có lỗi xảy ra');
          logger.error(error);
        }
      })
    );
  };

  const handleUpdateCartItem = async (id: string, quantity: number) => {
    await withLoading(
      updateCartItem.mutateAsync(
        { id, quantity },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
          },
          onError: (error) => {
            notify.error('Đã có lỗi xảy ra');
            logger.error(error);
          }
        }
      )
    );
  };

  return (
    <div>
      <Button
        variant='ghost'
        onClick={() => setOpen(true)}
        className='hover:text-green-primary group size-full rounded-full p-0! focus:outline-none focus-visible:ring-0'
      >
        <div className='relative'>
          <RiShoppingCartLine className='size-[21px]' />
          <div
            className={cn(
              'group-hover:bg-green-primary absolute -top-1.5 left-2.5 flex h-4 w-5 items-center justify-center rounded-full bg-black py-0 text-xs text-white transition-all duration-200 ease-linear',
              {
                'w-6': cartItemQuantity > 9
              }
            )}
          >
            {profile ? (cartItemQuantity > 9 ? '9+' : cartItemQuantity) : 0}
          </div>
        </div>
        Giỏ hàng
      </Button>

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
              <div className='relative flex items-center justify-between border-b p-4'>
                <h2 className='text-lg font-semibold'>Giỏ hàng</h2>
                <Button
                  variant={'ghost'}
                  onClick={() => setOpen(false)}
                  className='absolute top-4.5 right-2 size-2 cursor-pointer p-0 hover:text-red-500'
                >
                  <FaTimes />
                </Button>
              </div>

              {!profile ? (
                <div className='flex flex-1 flex-col items-center justify-center overflow-y-auto p-4'>
                  <p className='text-gray-500'>
                    Vui lòng&nbsp;
                    <Link
                      className='text-green-primary transition-all duration-200 ease-linear hover:opacity-80'
                      href={route.login}
                    >
                      đăng nhập
                    </Link>
                    &nbsp; để xem giỏ hàng
                  </p>
                  <Image
                    src={emptyCart.src}
                    alt='Empty Cart'
                    width={200}
                    height={200}
                  />
                </div>
              ) : !cart?.cartItems?.length && !loading ? (
                <div className='flex flex-1 flex-col items-center justify-center overflow-y-auto p-4'>
                  <p className='text-gray-500'>Giỏ hàng của bạn đang trống</p>
                  <Image
                    src={emptyCart.src}
                    alt='Empty Cart'
                    width={200}
                    height={200}
                  />
                </div>
              ) : loading ? (
                <div className='m-auto flex h-full items-center justify-center'>
                  <HamsterLoading />
                </div>
              ) : (
                <ul className='h-full overflow-auto px-5 pt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                  {cart?.cartItems?.map((cartItem) => (
                    <CartItem
                      key={cartItem?.id}
                      cartItem={cartItem}
                      onRemoveCartItem={handleRemoveFromCart}
                      onUpdateCartItem={handleUpdateCartItem}
                      onClose={() => setOpen(false)}
                    />
                  ))}
                </ul>
              )}

              {!loading && (
                <div className='border-t p-5'>
                  <Button variant={'primary'} className='w-full text-white'>
                    <Link className='h-full w-full' href={route.cart}>
                      Xem giỏ hàng
                    </Link>
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
