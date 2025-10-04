'use client';

import { Col, Row } from '@/components/form';
import Image from 'next/image';
import Link from 'next/link';
import { emptyCart } from '@/assets';
import route from '@/routes';
import { useAuthStore, useCartStore } from '@/store';
import {
  useCartQuery,
  useDeleteItemMutation,
  useUpdateCartItemMutation
} from '@/queries';
import { useQueryClient } from '@tanstack/react-query';
import { notify } from '@/utils';
import { logger } from '@/logger';
import { useCallback } from 'react';
import { Check } from 'lucide-react';
import CartItem from '@/app/cart/_components/cart-item';
import CouponList from '@/app/cart/_components/coupon-list';

export default function CartList() {
  const { profile } = useAuthStore();
  const queryClient = useQueryClient();

  const cartQuery = useCartQuery({ enabled: !!profile });
  const cart = cartQuery?.data?.data;

  const removeFromCartMutation = useDeleteItemMutation();
  const updateCartItemMutation = useUpdateCartItemMutation();

  const { selectedCartItems, setSelectedCartItems } = useCartStore();

  const handleRemoveFromCart = useCallback(
    (id: string) => {
      removeFromCartMutation.mutate(id, {
        onSuccess: () => {
          notify.success('Xóa sách khỏi giỏ hàng thành công');
          queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
          notify.error('Đã có lỗi xảy ra');
          logger.error(error);
        }
      });
    },
    [removeFromCartMutation, queryClient]
  );

  const handleUpdateCartItem = useCallback(
    (id: string, quantity: number) => {
      updateCartItemMutation.mutate(
        { id, quantity },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['cart'] }),
          onError: (error) => {
            notify.error('Đã có lỗi xảy ra');
            logger.error(error);
          }
        }
      );
    },
    [updateCartItemMutation, queryClient]
  );

  const handleSelectAll = useCallback(() => {
    setSelectedCartItems(
      selectedCartItems.length ===
        cart?.cartItems?.map((item) => item.id).length
        ? []
        : cart?.cartItems?.map((item) => item.id) || []
    );
  }, [cart, selectedCartItems, setSelectedCartItems]);

  const totalPrice =
    cart?.cartItems
      ?.filter((item) => selectedCartItems.includes(item.id))
      ?.reduce(
        (sum, item) =>
          sum +
          (item.quantity *
            (+item.productVariant.modifiedPrice +
              +item.productVariant.product.price) *
            (100 - item.productVariant.product.discount)) /
            100,
        0
      ) ?? 0;

  if (!profile) {
    return (
      <div className='flex h-[80vh] flex-1 flex-col items-center justify-center rounded-lg bg-white p-4'>
        <p className='text-gray-500'>
          Vui lòng{' '}
          <Link
            className='text-green-primary transition-all duration-200 hover:opacity-80'
            href={route.login}
          >
            đăng nhập
          </Link>{' '}
          để xem giỏ hàng
        </p>
        <Image src={emptyCart} alt='Empty Cart' width={200} height={200} />
      </div>
    );
  }

  if (!cart?.cartItems?.length) {
    return (
      <div className='flex h-[80dvh] flex-1 flex-col items-center justify-center bg-white p-4'>
        <p className='text-gray-500'>Giỏ hàng của bạn trống</p>
        <Image src={emptyCart.src} alt='Empty Cart' width={200} height={200} />
      </div>
    );
  }

  return (
    <Row className='mt-4 gap-x-4'>
      <Col span={16}>
        <div className='w-full overflow-hidden rounded-lg'>
          <div className='mb-4 flex items-center rounded-lg bg-white pl-6'>
            <label className='relative flex cursor-pointer items-center'>
              <input
                type='checkbox'
                onChange={handleSelectAll}
                checked={
                  selectedCartItems.length === cart.cartItems.length &&
                  cart.cartItems.length > 0
                }
                className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
              />
              <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                <Check className='h-5 w-5' />
              </span>
            </label>

            <div className='flex-1 p-4'>
              Chọn tất cả ({cart.cartItems.length} sản phẩm)
            </div>
            <div className='w-22.5 py-4 text-center'>Số lượng</div>
            <div className='basis-[18%] p-4 text-center'>Tổng</div>
            <div className='basis-[6%]' />
          </div>

          <div className='rounded-lg bg-white shadow-[0px_0px_10px_2px] shadow-gray-200'>
            {cart.cartItems.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                onRemoveCartItem={handleRemoveFromCart}
                onUpdateCartItem={handleUpdateCartItem}
              />
            ))}
          </div>
        </div>
      </Col>

      <Col span={8}>
        <CouponList
          totalPrice={totalPrice}
          isSelected={selectedCartItems.length > 0}
        />
      </Col>
    </Row>
  );
}
