'use client';

import CancelOrderButton from '@/app/user/order/_components/cancel-order-button';
import CompletePaymentButton from '@/app/user/order/_components/complete-payment-button';
import ConfirmReceivedOrderButton from '@/app/user/order/_components/confirm-received-order-button';
import ReOrderButton from '@/app/user/order/_components/re-order-button';
import { Button } from '@/components/form';
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
import route from '@/routes';
import { OrderResType } from '@/types';
import { formatDate, formatPrice, renderImageUrl } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderItem({
  order,
  currentStatus
}: {
  order: OrderResType;
  currentStatus: number;
}) {
  const navigate = useNavigate();

  const orderStatus = orderStatuses.find(
    (status) => status.value === currentStatus
  );

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
        <div key={orderItem.id}>
          <div className='mb-3 flex items-center border-b border-solid border-gray-200'>
            <div className='mb-4 flex h-20 w-full items-center'>
              <Link
                href={`${route.book}/${orderItem.productVariant.product.slug}.${orderItem.productVariant.product.id}`}
                className='flex-shrink-0'
              >
                <Image
                  src={renderImageUrl(orderItem.productVariant.imageUrl)}
                  width={90}
                  height={90}
                  alt={'Sách'}
                  className='rounded-lg object-contain'
                />
              </Link>
              <div className='ml-6 flex h-full w-full items-stretch justify-between'>
                <div className='flex flex-col justify-between'>
                  <Link
                    href={`${route.book}/${orderItem.productVariant.product.slug}.${orderItem.productVariant.product.id}`}
                    className='hover:text-green-primary block flex-1 flex-shrink-0 transition-all duration-200 ease-linear'
                  >
                    {orderItem.productVariant.product.name}
                  </Link>
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
                <div className='flex flex-col items-end justify-center'>
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
        <Button
          onClick={() => navigate(`${route.user.order}/${order.id}`)}
          variant={'primary'}
        >
          Xem chi tiết
        </Button>
        {currentStatus === ORDER_STATUS_WAITING && (
          <>
            <CompletePaymentButton orderId={order.id} />
            <CancelOrderButton orderId={order.id} />
          </>
        )}

        {currentStatus === ORDER_STATUS_CANCELLED ||
          (currentStatus === ORDER_STATUS_RECEIVED && (
            <ReOrderButton orderItems={order.orderItems} />
          ))}
        {(orderStatus?.value === ORDER_STATUS_SHIPPING ||
          orderStatus?.value === ORDER_STATUS_COMPLETE) && (
          <div className='flex w-full justify-end py-4'>
            <ConfirmReceivedOrderButton
              disabled={orderStatus?.value === ORDER_STATUS_SHIPPING}
              orderId={order.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
