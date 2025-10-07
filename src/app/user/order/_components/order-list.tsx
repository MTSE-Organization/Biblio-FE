'use client';
import OrderItem from '@/app/user/order/_components/order-item';
import OrderItemSkeleton from '@/app/user/order/_components/order-item-skeleton';
import { Button } from '@/components/form';
import { NoData } from '@/components/no-data';
import { ORDER_STATUS_ALL, orderStatuses } from '@/constants';
import { cn } from '@/lib';
import { useOrderListQuery } from '@/queries';
import { useState } from 'react';

export default function OrderList() {
  const [currentStatus, setCurrentStatus] = useState<number | null>(
    ORDER_STATUS_ALL
  );
  const orderListQuery = useOrderListQuery({ currentStatus });
  const orderList = orderListQuery.data?.data.content || [];
  const loading = orderListQuery.isLoading || orderListQuery.isFetching;

  return (
    <>
      {/* Order filter tabs */}
      <div className='mb-4 flex items-center justify-evenly rounded-lg bg-white py-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
        {orderStatuses.map((status) => (
          <Button
            variant={'ghost'}
            key={status.value}
            onClick={() => setCurrentStatus(status.value)}
            className={cn('hover:text-dark-cyan/80 p-0! text-sm font-medium', {
              'text-dark-cyan': currentStatus === status.value
            })}
          >
            {status.label}
          </Button>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        {loading ? (
          <OrderItemSkeleton />
        ) : orderList.length == 0 ? (
          <NoData className='h-[70dvh]' />
        ) : (
          orderList.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              currentStatus={order.currentStatus}
            />
          ))
        )}
      </div>
    </>
  );
}
