'use client';

import { Button } from '@/components/form';
import { List, ListItem } from '@/components/list';
import { CircleLoading } from '@/components/loading';
import {
  COUPON_KIND_DISCOUNT,
  COUPON_KIND_FREESHIP,
  storageKeys
} from '@/constants';
import { logger } from '@/logger';
import { usePlaceOrderMutation, useShippingAddressMutation } from '@/queries';
import route from '@/routes';
import { useCartStore, useOrderStore } from '@/store';
import { useAppLoadingStore } from '@/store/use-app-loading-store';
import { OrderBodyType, OrderResType } from '@/types';
import { formatPrice, getData, notify, removeData } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CompleteCheckout({ order }: { order?: OrderResType }) {
  const router = useRouter();
  const { withLoading } = useAppLoadingStore();
  const { selectedDiscountCoupon, selectedFreeShipCoupon, resetStore } =
    useCartStore();
  const [shippingFee, setShippingFee] = useState<number>(0);
  const { addressId, note, paymentMethod } = useOrderStore();
  const placeOrderMutation = usePlaceOrderMutation();
  const queryClient = useQueryClient();
  const orderId = getData(storageKeys.ORDER_ID) as string;

  const shippingFeeMutation = useShippingAddressMutation();

  useEffect(() => {
    const getShippingFee = async () => {
      if (!orderId || !addressId) return;
      try {
        const res = await withLoading(
          shippingFeeMutation.mutateAsync({
            addressId,
            orderId
          })
        );
        setShippingFee(res.data?.shippingFee ?? 0);
      } catch (error) {
        logger.error('Error getting shipping fee:', error);
      }
    };
    getShippingFee();
  }, [orderId, addressId]);

  if (!order) return null;

  const total = order.orderItems
    .reduce(
      (sum, item) =>
        sum +
        (parseFloat(item.price) * item.quantity * (100 - item.discount)) / 100,
      0
    )
    .toFixed(2);

  const handleCompleteCheckout = async () => {
    const payload: OrderBodyType = {
      id: orderId,
      addressId,
      couponIds: [
        selectedFreeShipCoupon?.id,
        selectedDiscountCoupon?.id
      ].filter((id): id is string => typeof id === 'string'),
      note,
      paymentMethod
    };
    await withLoading(
      placeOrderMutation.mutateAsync(payload, {
        onSuccess: (res) => {
          if (res.result) {
            notify.success('Thanh toán thành công');
            queryClient.refetchQueries({ queryKey: ['order', orderId] });
            resetStore();
            router.replace(`${route.user.order}/${orderId}`);
            removeData(storageKeys.ORDER_ID);
          }
        },
        onError: (error) => {
          logger.error('Error while paying:', error);
          notify.error('Có lỗi xảy ra');
        }
      })
    );
  };

  const freeShip =
    order.coupons.find((coupon) => coupon.kind === COUPON_KIND_FREESHIP)
      ?.value ?? 0;

  const discount =
    order.coupons.find((coupon) => coupon.kind === COUPON_KIND_DISCOUNT)
      ?.value ?? 0;

  return (
    <div className='rounded-md border px-6 py-4'>
      <p className='text-green-primary text-center text-base font-semibold'>
        Tóm tắt đơn hàng
      </p>
      <List className='mt-[15px]'>
        <ListItem className='flex justify-between py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
            Tổng tiền hàng
          </label>
          {formatPrice(total)}
        </ListItem>
        <ListItem className='flex justify-between py-[5px] text-[#777]'>
          <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
            Phí vận chuyển
          </label>
          {+shippingFee === 0 ? 'Miễn phí' : formatPrice(+shippingFee)}
        </ListItem>
        {freeShip ? (
          <ListItem className='flex justify-between py-[5px] text-[#777]'>
            <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
              Giảm phí vận chuyển
            </label>
            -
            {formatPrice(
              +freeShip > 0 && +freeShip <= 100
                ? (+freeShip * +total) / 100
                : +freeShip
            )}
          </ListItem>
        ) : null}
        {discount ? (
          <ListItem className='flex justify-between py-[5px] text-[#777]'>
            <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
              Giảm giá sách
            </label>
            -
            {formatPrice(
              +discount > 0 && +discount <= 100
                ? (+discount * +total) / 100
                : +discount
            )}
          </ListItem>
        ) : null}
        <ListItem>
          <hr className='my-2 border-t border-gray-300' />
        </ListItem>
        <ListItem className='text-green-primary flex items-center justify-between py-[5px] font-semibold'>
          <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
            Tổng thanh toán
          </label>
          {formatPrice(order.total)}
        </ListItem>
      </List>
      <Button
        onClick={handleCompleteCheckout}
        variant={'primary'}
        className='mt-3 mb-2.5 w-full'
      >
        {placeOrderMutation.isPending ? <CircleLoading /> : 'Đặt hàng'}
      </Button>
    </div>
  );
}
