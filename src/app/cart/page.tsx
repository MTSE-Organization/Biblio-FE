'use client';

import { Button, Col, Row } from '@/components/form';
import Image from 'next/image';
import Link from 'next/link';
import { emptyCart, product } from '@/assets';
import { RiDeleteBin6Line } from 'react-icons/ri';
import route from '@/routes';
import { useAuthStore } from '@/store';
import {
  useCartQuery,
  useDeleteItemMutation,
  useUpdateCartItemMutation
} from '@/queries';
import { useQueryClient } from '@tanstack/react-query';
import { formatPrice, notify, renderImageUrl } from '@/utils';
import { logger } from '@/logger';
import { CartItemResType } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { List, ListItem } from '@/components/list';

function CartItem({
  cartItem,
  onRemoveCartItem,
  onUpdateCartItem,
  selectedCartItemIds,
  setSelectedCartItemIds
}: {
  cartItem: CartItemResType;
  onRemoveCartItem: (id: string) => void;
  onUpdateCartItem: (id: string, quantity: number) => void;
  selectedCartItemIds: string[];
  setSelectedCartItemIds: any;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const isChecked = selectedCartItemIds.includes(cartItem?.id);

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

  const handleToggleSelect = () => {
    setSelectedCartItemIds((prev: string[]) =>
      isChecked
        ? prev.filter((id) => id !== cartItem.id)
        : [...prev, cartItem.id]
    );
  };

  return (
    <tr>
      <td className='w-[60px] py-5 text-center'>
        <div className='inline-flex items-center'>
          <label className='relative flex cursor-pointer items-center'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleToggleSelect}
              id='check'
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
      </td>
      <td className='px-3.5 py-5 font-semibold'>
        <Link
          className=''
          href={`${route.book}/${cartItem?.productVariant?.product?.slug}.${cartItem?.productVariant?.product?.id}`}
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
      </td>
      <td>
        <Link
          href={`${route.book}/${cartItem?.productVariant?.product?.slug}.${cartItem?.productVariant?.product?.id}`}
          className='hover:text-green-primary leading-6 font-medium break-all transition-all duration-200 ease-linear'
          title={cartItem?.productVariant?.product?.name}
        >
          {cartItem?.productVariant?.product?.name}
        </Link>
      </td>
      <td className='px-3.5 py-5'>
        {cartItem?.productVariant?.product?.discount === 0 && (
          <p className='text-green-primary text-base font-bold'>
            {formatPrice(cartItem?.productVariant?.modifiedPrice)} ₫
          </p>
        )}
        {cartItem?.productVariant?.product?.discount !== 0 && (
          <div className='flex items-center gap-2'>
            <p className='text-green-primary text-base font-bold'>
              {formatPrice(
                (cartItem?.productVariant?.modifiedPrice *
                  (100 - cartItem?.productVariant?.product?.discount)) /
                  100
              )}{' '}
              ₫
            </p>
            <p className='text-xs font-bold text-gray-400 line-through'>
              {formatPrice(cartItem?.productVariant?.modifiedPrice)} ₫
            </p>
            <p className='bg-green-primary rounded p-1 text-xs text-white'>
              -{cartItem?.productVariant?.product?.discount} %
            </p>
          </div>
        )}
      </td>
      <td className='px-3.5 py-5 text-center'>
        <div className='mt-[5px] flex h-[30px] w-[90px] items-center justify-between rounded-sm border'>
          <Button
            type='button'
            onClick={handleDecreaseQuantity}
            variant={'ghost'}
            className='hover:text-green-primary flex h-4 w-[20px] cursor-pointer items-center justify-center p-0 text-base hover:bg-transparent'
          >
            -
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
            type='button'
            onClick={handleIncreaseQuantity}
            variant={'ghost'}
            className='hover:text-green-primary flex h-4 w-[20px] cursor-pointer items-center justify-center p-0 text-base hover:bg-transparent'
          >
            +
          </Button>
        </div>
      </td>
      <td className='px-3.5 py-5 text-right'>
        <p className='text-green-primary text-base font-bold'>
          {formatPrice(
            (cartItem?.quantity *
              cartItem?.productVariant?.modifiedPrice *
              (100 - cartItem?.productVariant?.product?.discount)) /
              100
          )}{' '}
          ₫
        </p>
      </td>
      <td className='px-3.5 py-5 text-center'>
        <button
          onClick={() => onRemoveCartItem(cartItem?.id)}
          className='cursor-pointer hover:text-red-500'
        >
          <RiDeleteBin6Line size={20} />
        </button>
      </td>
    </tr>
  );
}

export default function CartPage() {
  const { profile } = useAuthStore();
  const cartQuery = useCartQuery({ enabled: profile ? true : false });

  const queryClient = useQueryClient();
  const cart = cartQuery?.data?.data;

  const removeFromCartMutation = useDeleteItemMutation();
  const updateCartItem = useUpdateCartItemMutation();

  const [selectedCartItemIds, setSelectedCartItemIds] = useState<string[]>([]);

  const handleRemoveFromCart = (id: string) => {
    removeFromCartMutation.mutateAsync(id, {
      onSuccess: () => {
        notify.success('Xóa sách khỏi giỏ hàng thàng công');
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      },
      onError: (error) => {
        notify.error('Đã có lỗi xảy ra');
        logger.error(error);
      }
    });
  };

  const handleUpdateCartItem = (id: string, quantity: number) => {
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
    );
  };

  const totalPrice = useMemo(() => {
    return (
      cart?.cartItems
        ?.filter((item) => selectedCartItemIds.includes(item.id))
        ?.reduce((sum, item) => {
          const price =
            (item.quantity *
              item.productVariant.modifiedPrice *
              (100 - item.productVariant.product.discount)) /
            100;
          return sum + price;
        }, 0) ?? 0
    );
  }, [cart, selectedCartItemIds]);

  return (
    <>
      <Row>
        <Col>
          <form onSubmit={(e) => e.preventDefault()}>
            {!profile ? (
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
                  src={emptyCart}
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
              <>
                <div className='rounded-md border'>
                  <table className='w-full'>
                    <thead className='bg-[#e4f2ed]'>
                      <tr>
                        <th className='p-4'></th>
                        <th className='p-4'></th>
                        <th className='p-4 text-left'>Sách</th>
                        <th className='p-4 text-left'>Giá</th>
                        <th className='p-4 text-left'>Số lượng</th>
                        <th className='p-4 text-right'>Tổng</th>
                        <th className='p-4'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart?.cartItems?.map((cartItem) => (
                        <CartItem
                          key={cartItem?.id}
                          cartItem={cartItem}
                          onRemoveCartItem={handleRemoveFromCart}
                          onUpdateCartItem={handleUpdateCartItem}
                          selectedCartItemIds={selectedCartItemIds}
                          setSelectedCartItemIds={setSelectedCartItemIds}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                <List className='mt-[15px] flex justify-end'>
                  <ListItem className='flex py-[5px] font-medium'>
                    <label className='mr-2.5 min-w-25 font-bold text-[#2b2b2d]'>
                      Tổng tiền:
                    </label>
                    <p className='text-green-primary text-base font-bold'>
                      {formatPrice(totalPrice)} đ
                    </p>
                  </ListItem>
                </List>
              </>
            )}

            <Row className='justify-between'>
              <Button className='text-green-primary border-green-primary hover:bg-green-primary border bg-transparent hover:text-white'>
                <Link href={route.home}>Tiếp tục mua sách</Link>
              </Button>
              <Button className='bg-green-primary'>Thanh toán</Button>
            </Row>
          </form>
        </Col>
      </Row>
    </>
  );
}
