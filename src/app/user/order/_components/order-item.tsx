'use client';

import CancelOrderButton from '@/app/user/order/_components/cancel-order-button';
import CompletePaymentButton from '@/app/user/order/_components/complete-payment-button';
import ConfirmReceivedOrderButton from '@/app/user/order/_components/confirm-received-order-button';
import ContactShopButton from '@/app/user/order/_components/contact-shop-button';
import ReOrderButton from '@/app/user/order/_components/re-order-button';
import RefundButton from '@/app/user/order/_components/refund-button';
import ReviewButton from '@/app/user/order/_components/review-button';
import { Badge } from '@/components/ui/badge';
import {
  DATE_DAY_TIME_FORMAT,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_COMPLETE,
  ORDER_STATUS_RECEIVED,
  ORDER_STATUS_SHIPPING,
  ORDER_STATUS_WAITING,
  orderStatuses,
  productVariantConditions,
  productVariantFormats
} from '@/constants';
import { useNavigate } from '@/hooks';
import { cn } from '@/lib';
import { useCheckReviewMutation } from '@/queries/review.query';
import route from '@/routes';
import { OrderResType } from '@/types';
import { formatDate, formatPrice, renderImageUrl } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function OrderItem({
  order,
  currentStatus
}: {
  order: OrderResType;
  currentStatus: number;
}) {
  const navigate = useNavigate();
  const checkReviewMutation = useCheckReviewMutation();

  const [reviewedMap, setReviewedMap] = useState<Record<string, boolean>>({});

  const orderStatus = orderStatuses.find(
    (status) => status.value === currentStatus
  );

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

  return (
    <div className='relative rounded rounded-lg border border-gray-200 bg-white p-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
      <div className='mb-4 flex items-center justify-between border-b border-solid border-gray-200 pb-4 font-medium'>
        <div className='text-sm text-gray-600'>
          {formatDate(order.createdDate, DATE_DAY_TIME_FORMAT)}
        </div>
        <Badge
          onClick={() => navigate(`${route.user.order}/${order.id}`)}
          className={cn(orderStatus?.color, 'cursor-pointer py-1 text-sm')}
        >
          {orderStatus?.label}
        </Badge>
      </div>
      {order.orderItems.map((orderItem) => (
        <div
          onClick={() => navigate(`${route.user.order}/${order.id}`)}
          key={orderItem.id}
          className='cursor-pointer'
        >
          <div className='mb-3 flex items-center border-b border-solid border-gray-200'>
            <div className='mb-4 flex h-20 w-full items-center'>
              <Image
                src={renderImageUrl(orderItem.productVariant.imageUrl)}
                width={90}
                height={90}
                alt={'Sách'}
                className='rounded-lg object-contain'
              />
              <div className='ml-2 flex h-full w-full items-stretch justify-between'>
                <div className='flex flex-col justify-between'>
                  <span className='flex-1 shrink-0'>
                    {orderItem.productVariant.product.name}
                  </span>
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
                </div>
                <div className='flex flex-col items-end justify-center gap-2'>
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
                    </div>
                  )}
                  {currentStatus === ORDER_STATUS_RECEIVED &&
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
        </div>
      ))}
      <div className='text-right'>
        <div>
          Thành tiền: &nbsp;
          <span className='font-semibold'>{formatPrice(order.total)}</span>
        </div>
      </div>
      <div className='mt-4 flex justify-end gap-2 text-right'>
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
        {orderStatus?.value === ORDER_STATUS_RECEIVED && <RefundButton />}

        {/* Contact shop */}
        <ContactShopButton />

        {/* Cancel order when status is not shipping */}
        {orderStatus?.value && orderStatus.value < ORDER_STATUS_SHIPPING ? (
          <CancelOrderButton orderId={order.id} />
        ) : null}

        {/* Re-order when status is cancelled or received */}
        {(orderStatus?.value === ORDER_STATUS_CANCELLED ||
          orderStatus?.value === ORDER_STATUS_RECEIVED) && (
          <ReOrderButton orderItems={order.orderItems} />
        )}
      </div>
    </div>
  );
}
