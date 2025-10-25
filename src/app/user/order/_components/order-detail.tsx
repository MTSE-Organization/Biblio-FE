'use client';

import CancelOrderButton from '@/app/user/order/_components/cancel-order-button';
import CompletePaymentButton from '@/app/user/order/_components/complete-payment-button';
import ConfirmReceivedOrderButton from '@/app/user/order/_components/confirm-received-order-button';
import ContactShopButton from '@/app/user/order/_components/contact-shop-button';
import OrderDetailSkeleton from '@/app/user/order/_components/order-detail-skeleton';
import ReOrderButton from '@/app/user/order/_components/re-order-button';
import RefundButton from '@/app/user/order/_components/refund-button';
import ReviewButton from '@/app/user/order/_components/review-button';
import { Button } from '@/components/form';
import { OrderNotFound } from '@/components/not-found';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  COUPON_KIND_DISCOUNT,
  COUPON_KIND_FREESHIP,
  DATE_TIME_FORMAT,
  ErrorCode,
  ORDER_DETAIL_STATUS_CANCELLED,
  ORDER_DETAIL_STATUS_REFUNDED,
  ORDER_DETAIL_STATUS_REQUEST_REFUND,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_COMPLETE,
  ORDER_STATUS_RECEIVED,
  ORDER_STATUS_REFUNDED,
  ORDER_STATUS_REQUEST_REFUND,
  ORDER_STATUS_SHIPPING,
  ORDER_STATUS_WAITING,
  orderDetailStatuses,
  orderStatuses,
  paymentMethods,
  productVariantConditions,
  productVariantFormats
} from '@/constants';
import { cn } from '@/lib';
import { useOrderQuery } from '@/queries';
import { useCheckReviewMutation } from '@/queries/review.query';
import route from '@/routes';
import { formatDate, formatPrice, renderImageUrl } from '@/utils';
import { ChevronLeft, MapPin, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const orderQuery = useOrderQuery(id);
  const checkReviewMutation = useCheckReviewMutation();

  const [reviewedMap, setReviewedMap] = useState<Record<string, boolean>>({});

  const order = orderQuery.data?.data;
  const orderStatusList = order?.orderStatuses || [];
  const orderItems = order?.orderItems || [];
  const code = orderQuery.data?.code;

  useEffect(() => {
    if (!order) return;

    const fetchReviews = async () => {
      const map: Record<string, boolean> = {};
      for (const item of order.orderItems) {
        const res = await checkReviewMutation.mutateAsync({
          orderId: order.id,
          productId: item.productVariant.product.id,
          productVariantId: item.productVariant.id
        });
        map[item.productVariant.product.id] = !!res.data?.isReviewed;
      }
      setReviewedMap(map);
    };

    fetchReviews();
  }, [order]);

  if (code === ErrorCode.ORDER_ERROR_NOT_FOUND) return <OrderNotFound />;
  if (orderQuery.isLoading) return <OrderDetailSkeleton />;

  if (!order) return null;

  const orderStatus = orderStatuses.find(
    (status) => status.value === order.currentStatus
  );

  const currentStatus = orderStatusList
    .sort((a, b) => b.status - a.status)
    .find((orderStatus) => {
      return orderDetailStatuses
        .map((item) => item.value)
        .includes(orderStatus.status);
    })?.status as number;

  const getStatusDate = (statusValue: number) => {
    const found = orderStatusList.find((s: any) => s.status === statusValue);
    if (!found) return null;
    return formatDate(found.createdDate.toString(), DATE_TIME_FORMAT);
  };

  const total = order.orderItems
    .reduce(
      (sum, item) =>
        sum +
        (parseFloat(item.price) * item.quantity * (100 - item.discount)) / 100,
      0
    )
    .toFixed(2);

  const freeShip =
    order.coupons.find((coupon) => coupon.kind === COUPON_KIND_FREESHIP)
      ?.value ?? 0;

  const discount =
    order.coupons.find((coupon) => coupon.kind === COUPON_KIND_DISCOUNT)
      ?.value ?? 0;

  return (
    <div className='rounded-lg bg-white px-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
      <div className='flex items-center justify-between py-4'>
        <Button
          variant='ghost'
          className='h-fit p-0!'
          onClick={() => router.replace(route.user.order)}
        >
          <ChevronLeft />
          Danh sách đơn hàng
        </Button>
        <Badge className={cn(orderStatus?.color, 'py-1 text-sm')}>
          {orderStatus?.label}
        </Badge>
      </div>

      <Separator />

      <div className='relative grid grid-cols-7 py-4'>
        {orderDetailStatuses.map((item, index) => {
          const isLast = index === orderDetailStatuses.length - 1;
          const isActive = index <= currentStatus;
          const isLineActive = index < currentStatus;

          const borderDelay = index * 300;
          const lineDelay = borderDelay + 100;

          return (
            <div
              key={item.label}
              className='relative flex flex-col items-center text-center select-none'
            >
              <div
                style={{
                  transitionDelay: `${borderDelay}ms`
                }}
                className={cn(
                  'relative z-1 flex h-14 w-14 items-center justify-center rounded-full border-4 border-solid transition-all duration-500 ease-in-out',
                  {
                    'border-green-500 bg-green-50 text-green-600': isActive,
                    'border-neutral-300 bg-white text-neutral-300': !isActive
                  }
                )}
              >
                {item.icon && <item.icon className='size-7' />}
              </div>

              {!isLast && (
                <div className='absolute top-[28px] left-1/2 -z-0 h-[4px] w-full bg-neutral-300'>
                  <div
                    style={{
                      transitionDelay: `${lineDelay}ms`
                    }}
                    className={cn(
                      'h-full w-full origin-left transform bg-green-500 transition-transform duration-700 ease-in-out',
                      {
                        'scale-x-100': isLineActive,
                        'scale-x-0': !isLineActive
                      }
                    )}
                  />
                </div>
              )}

              <h3 className='mt-4 mb-1 block text-center text-sm font-medium whitespace-nowrap text-slate-800'>
                {item.label}
              </h3>
              <span className='h-[14px] text-xs text-gray-400'>
                {getStatusDate(item.value)}
              </span>
            </div>
          );
        })}
      </div>

      {orderStatusList.find(
        (orderStatus) => orderStatus.status === ORDER_DETAIL_STATUS_CANCELLED
      ) && (
        <>
          <Separator />

          <div className='ml-10 py-8 pl-4'>
            <span className='text-base text-orange-600'>Đã hủy đơn hàng</span>
            <br />
            <span>vào: {getStatusDate(order.currentStatus)}</span>
          </div>
        </>
      )}

      {orderStatusList.find(
        (orderStatus) =>
          orderStatus.status === ORDER_DETAIL_STATUS_REQUEST_REFUND
      ) && (
        <>
          <Separator />
          <div className='ml-10 py-8 pl-4'>
            <span className='text-base text-orange-600'>
              Yêu cầu trả hàng, hoàn tiền
            </span>
            <br />
            <span>vào: {getStatusDate(order.currentStatus)}</span>
            <br />
            <span className='text-base'>
              <span className='font-bold'> Lí do:</span>{' '}
              <span> {order.refundReason}</span>
            </span>
          </div>
        </>
      )}

      {orderStatusList.find(
        (orderStatus) => orderStatus.status === ORDER_DETAIL_STATUS_REFUNDED
      ) && (
        <>
          <Separator />
          <div className='ml-10 py-8 pl-4'>
            <span className='text-base text-orange-600'>
              Đã xác nhận trả hàng, hoàn tiền
            </span>
            <br />
            <span>vào: {getStatusDate(order.currentStatus)}</span>
          </div>
        </>
      )}

      <Separator />

      <div className='flex items-center py-4'>
        <MapPin className='size-5' />
        <span className='ml-1 font-semibold'>Địa chỉ giao hàng:</span>
        &nbsp;
        {order.address.detail}, {order.address.hamlet}, &nbsp;
        {order.address.ward}, {order.address.district}, &nbsp;
        {order.address.city}
      </div>

      <Separator />

      {order.note && (
        <>
          <div className='py-4'>
            <div className='flex items-center'>
              <Send className='size-5' />
              <span className='ml-1 font-semibold'>Lời nhắn:</span>
              &nbsp;
              {order.note}
            </div>
          </div>
          <Separator />
        </>
      )}

      {orderItems.map((orderItem) => (
        <div key={orderItem.id}>
          <div className='flex items-center py-4'>
            <div className='flex h-22.5 w-full items-center'>
              <Link
                href={`${route.book}/${orderItem.productVariant.product.slug}.${orderItem.productVariant.product.id}`}
                className='h-full flex-shrink-0'
              >
                <Image
                  src={renderImageUrl(orderItem.productVariant.imageUrl)}
                  width={120}
                  height={90}
                  alt={'Sách'}
                  className='h-full w-full rounded object-cover'
                />
              </Link>
              <div className='ml-4 flex h-full w-full items-stretch justify-between'>
                <div className='flex flex-col justify-between'>
                  <Link
                    href={`${route.book}/${orderItem.productVariant.product.slug}.${orderItem.productVariant.product.id}`}
                    className='hover:text-green-primary block flex-1 flex-shrink-0 transition-all duration-200 ease-linear'
                  >
                    {orderItem.productVariant.product.name}
                  </Link>
                  <>
                    <p className='font-medium text-gray-400'>
                      Phân loại: &nbsp;
                      {
                        productVariantConditions.find(
                          (pvc) =>
                            pvc.value === orderItem.productVariant.condition
                        )?.label
                      }
                      &nbsp; & &nbsp;
                      {
                        productVariantFormats.find(
                          (pvf) => pvf.value === orderItem.productVariant.format
                        )?.label
                      }
                    </p>
                    <p className='text-zinc-800'>x{orderItem.quantity}</p>
                  </>
                </div>
                <div className='flex flex-col items-end justify-center gap-4'>
                  {orderItem.discount === 0 ? (
                    <p className='text-zinc-800'>
                      {formatPrice(orderItem.total)}
                    </p>
                  ) : (
                    <div className='flex items-center gap-x-2'>
                      <p className='text-zinc-800'>
                        {formatPrice(orderItem.total)}
                      </p>
                      <p className='text-xs text-gray-400 line-through'>
                        {formatPrice(orderItem.price)}
                      </p>
                      {orderItem.productVariant.product.discount !== 0 && (
                        <div className='flex items-center gap-2'>
                          <p className='bg-green-primary rounded p-0.5 text-xs text-white'>
                            -{orderItem.productVariant.product.discount} %
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {order.currentStatus === ORDER_STATUS_RECEIVED &&
                    !reviewedMap[orderItem.productVariant.product.id] && (
                      <ReviewButton
                        productId={orderItem.productVariant.product.id}
                        productVariantId={orderItem.productVariant.id}
                        orderId={order.id}
                        onSuccess={() => {
                          setReviewedMap((prev) => ({
                            ...prev,
                            [orderItem.productVariant.product.id]: true
                          }));
                        }}
                      />
                    )}
                </div>
              </div>
            </div>
          </div>
          <Separator />
        </div>
      ))}

      <SummaryRow
        title='Yêu cầu bởi'
        value='Nguời mua'
        hidden={order.currentStatus < ORDER_DETAIL_STATUS_CANCELLED}
        bottomLine={false}
      />

      <Separator />

      <SummaryRow
        title='Phương thức thanh toán'
        value={
          paymentMethods.find((pmth) => pmth.value === order.paymentMethod)
            ?.label ?? 'Chưa thanh toán'
        }
      />

      <SummaryRow title='Tổng tiền' value={+total} hidden={false} />

      <SummaryRow
        title='Phí vận chuyển'
        value={+order.deliveryFee}
        hidden={+order.deliveryFee === 0}
      />

      <SummaryRow
        title='Giảm phí vận chuyển'
        prefix={
          +freeShip > 0 &&
          +freeShip <= 100 && (
            <span className='bg-green-primary mr-1 rounded-sm p-0.5 text-xs text-white'>
              -{freeShip}%
            </span>
          )
        }
        value={
          +freeShip > 0 && +freeShip <= 100
            ? (+freeShip * +total) / 100
            : +freeShip
        }
        hidden={+freeShip === 0}
      />

      <SummaryRow
        title='Giảm giá sách'
        prefix={
          +discount > 0 &&
          +discount <= 100 && (
            <span className='bg-green-primary mr-1 rounded-sm p-0.5 text-xs text-white'>
              -{discount}%
            </span>
          )
        }
        value={
          +discount > 0 && +discount <= 100
            ? (+discount * +total) / 100
            : +discount * -1
        }
        hidden={+discount === 0}
      />

      <SummaryRow title='Thành tiền' value={+order.total} />

      <div className='flex w-full justify-end gap-x-2 py-4'>
        {/* Complete payment if just created other */}
        {orderStatus?.value === ORDER_STATUS_WAITING && (
          <CompletePaymentButton orderId={order.id} />
        )}

        {/* Confirm received order when status is shipping or complete */}
        {/* Show and disabled when status is shipping */}
        {(orderStatus?.value === ORDER_STATUS_SHIPPING ||
          orderStatus?.value === ORDER_STATUS_COMPLETE) && (
          <ConfirmReceivedOrderButton
            disabled={orderStatus?.value === ORDER_STATUS_SHIPPING}
            orderId={order.id}
          />
        )}

        {/* Request refund */}
        {orderStatus?.value === ORDER_STATUS_RECEIVED && (
          <RefundButton orderId={order.id} />
        )}

        {/* Contact shop */}
        <ContactShopButton />

        {/* Cancel order when status is not shipping */}
        {orderStatus?.value && orderStatus.value < ORDER_STATUS_SHIPPING ? (
          <CancelOrderButton orderId={order.id} />
        ) : null}

        {/* Re-order when status is cancelled or received */}
        {(orderStatus?.value === ORDER_STATUS_CANCELLED ||
          orderStatus?.value === ORDER_STATUS_RECEIVED ||
          orderStatus?.value === ORDER_STATUS_REFUNDED) && (
          <ReOrderButton orderItems={order.orderItems} />
        )}
      </div>
    </div>
  );
}

function SummaryRow({
  title,
  value,
  hidden = false,
  bottomLine = true,
  prefix,
  suffix
}: {
  title: string;
  value: string | number;
  hidden?: boolean;
  bottomLine?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  if (hidden) return null;
  return (
    <>
      <div className='flex h-12 items-center justify-end text-right'>
        <div className='relative flex h-full items-center'>
          {title}: &nbsp;
          <div className='absolute top-0 right-0 h-full w-px bg-gray-200'></div>
        </div>
        <span className='w-50 font-semibold'>
          {prefix}
          {typeof value === 'string' ? value : formatPrice(value)}
          {suffix}
        </span>
      </div>

      {bottomLine && <Separator />}
    </>
  );
}
