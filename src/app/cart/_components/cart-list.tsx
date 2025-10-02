'use client';

import { Button, Col, Row, ToolTip } from '@/components/form';
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
import { Check, ChevronRight, Info, Minus, Plus, Ticket } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
    <div className='flex items-center pl-6'>
      <div className='text-center'>
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
      </div>
      <div className='flex flex-1 p-4 font-semibold'>
        <Link
          className='shrink-0'
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
        <div className='flex flex-col justify-between pl-4'>
          <Link
            href={`${route.book}/${cartItem?.productVariant?.product?.slug}.${cartItem?.productVariant?.product?.id}`}
            className='hover:text-green-primary leading-6 font-medium transition-all duration-200 ease-linear'
            title={cartItem?.productVariant?.product?.name}
          >
            {cartItem?.productVariant?.product?.name}
          </Link>
          <div>
            {cartItem?.productVariant?.product?.discount === 0 && (
              <p className='text-green-primary text-base font-bold'>
                {formatPrice(cartItem?.productVariant?.modifiedPrice)}
              </p>
            )}
            {cartItem?.productVariant?.product?.discount !== 0 && (
              <div className='flex items-center gap-2'>
                <p className='text-green-primary text-base font-bold'>
                  {formatPrice(
                    (cartItem?.productVariant?.modifiedPrice *
                      (100 - cartItem?.productVariant?.product?.discount)) /
                      100
                  )}
                </p>
                <p className='text-xs font-bold text-gray-400 line-through'>
                  {formatPrice(cartItem?.productVariant?.modifiedPrice)}
                </p>
                <p className='bg-green-primary rounded p-1 text-xs text-white'>
                  -{cartItem?.productVariant?.product?.discount} %
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
            variant={'ghost'}
            className='hover:text-green-primary ml-1 flex h-full w-5 cursor-pointer items-center justify-center p-0! transition-all duration-200 ease-linear hover:bg-transparent'
          >
            <Minus />
          </Button>
          <input
            type='text'
            value={quantity}
            onChange={handleChangeQuantity}
            minLength={1}
            maxLength={cartItem.productVariant.quantity}
            className='w-[40px] text-center focus:border-none focus:outline-none'
          />
          <Button
            type='button'
            onClick={handleIncreaseQuantity}
            variant={'ghost'}
            className='hover:text-green-primary mr-1 flex h-full w-5 cursor-pointer items-center justify-center p-0! transition-all duration-200 ease-linear hover:bg-transparent'
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className='basis-[18%] p-4 text-center'>
        <p className='text-green-primary text-base font-semibold'>
          {formatPrice(
            (cartItem?.quantity *
              cartItem?.productVariant?.modifiedPrice *
              (100 - cartItem?.productVariant?.product?.discount)) /
              100
          )}
        </p>
      </div>
      <div className='basis-[5%] p-4 text-center'>
        <button
          onClick={() => onRemoveCartItem(cartItem?.id)}
          className='cursor-pointer transition-all duration-200 ease-linear hover:text-red-500'
        >
          <RiDeleteBin6Line size={20} />
        </button>
      </div>
    </div>
  );
}

export default function CartList() {
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

  if (!profile) {
    return (
      <div className='flex h-[80vh] flex-1 flex-col items-center justify-center overflow-y-auto rounded-lg bg-white p-4'>
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
        <Image src={emptyCart} alt='Empty Cart' width={200} height={200} />
      </div>
    );
  }

  if (!cart?.cartItems?.length) {
    return (
      <div className='flex flex-1 flex-col items-center justify-center overflow-y-auto p-4'>
        <p className='text-gray-500'>Giỏ hàng của bạn đang trống</p>
        <Image src={emptyCart.src} alt='Empty Cart' width={200} height={200} />
      </div>
    );
  }

  return (
    <Row className='mt-4'>
      <Col span={16}>
        <div className='w-full overflow-hidden rounded-lg'>
          <div className='mb-4 flex items-center rounded-lg bg-white pl-6'>
            <div className='inline-flex items-center'>
              <label className='relative flex cursor-pointer items-center'>
                <input
                  type='checkbox'
                  id='check'
                  className='peer checked:bg-green-primary h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all hover:shadow-md'
                />
                <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100'>
                  <Check className='h-5 w-5' />
                </span>
              </label>
            </div>
            <div className='flex-1 p-4'>
              Chọn tất cả ({cart.cartItems.length} sản phẩm)
            </div>
            <div className='w-22.5 py-4 text-center'>Số lượng</div>
            <div className='basis-[18%] p-4 text-center'>Tổng</div>
            <div className='basis-[6%]'></div>
          </div>
          <div className='rounded-lg bg-white shadow-[0px_0px_10px_2px] shadow-gray-200'>
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
          </div>
        </div>
      </Col>

      <Col span={8}>
        <div className='rounded-lg bg-white p-4'>
          <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
            <div className='flex items-center gap-x-2 text-[#2F80ED]'>
              <Ticket />
              <h3>Khuyến mãi</h3>
            </div>
            <div className='text flex text-[#2F80ED]'>
              <p>Xem thêm</p>
              <ChevronRight />
            </div>
          </div>
          <div className='mt-2 flex items-center justify-between rounded bg-[#2F80ED33] p-2 text-[#2F80ED]'>
            <span>Có 10 khuyến mãi đủ điều kiện</span>
            <ChevronRight />
          </div>
          <div className='mt-2 flex items-center justify-between p-2'>
            Có thể áp dụng nhiều mã
            <ToolTip
              title={
                <p className='text-center'>
                  Áp dụng tối đa một mã giảm giá và một mã freeship
                </p>
              }
            >
              <Info />
            </ToolTip>
          </div>
        </div>

        <div className='mt-4 rounded-lg bg-white p-4'>
          <div className='flex justify-between'>
            <span>Thành tiền</span>
            <span>{formatPrice(360000)}</span>
          </div>
          <Separator className='my-4' />
          <div className='flex justify-between'>
            <span>Tổng số tiền (bao gồm VAT)</span>
            <span>{formatPrice(360000)}</span>
          </div>
          <div className='mt-4 flex justify-end'>
            <Button variant={'primary'} className='block w-full'>
              Thanh toán
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
