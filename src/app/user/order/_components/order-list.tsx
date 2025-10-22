'use client';
import OrderItem from '@/app/user/order/_components/order-item';
import OrderItemSkeleton from '@/app/user/order/_components/order-item-skeleton';
import { Button } from '@/components/form';
import { DotLoading } from '@/components/loading';
import { NoData } from '@/components/no-data';
import { ORDER_STATUS_ALL, orderStatuses } from '@/constants';
import { cn } from '@/lib';
import { useInfiniteOrderListQuery } from '@/queries';
import { useEffect, useRef, useState } from 'react';

export default function OrderList() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [currentStatus, setCurrentStatus] = useState<number | null>(
    ORDER_STATUS_ALL
  );
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteOrderListQuery({
      enabled: true,
      params: {
        currentStatus,
        size: 5
      }
    });

  const orders = data?.pages.flatMap((page) => page.data.content) || [];

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
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
        {isLoading ? (
          <OrderItemSkeleton />
        ) : orders.length == 0 ? (
          <NoData content='Bạn chưa có đơn hàng nào' className='h-[70dvh]' />
        ) : (
          orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              currentStatus={order.currentStatus}
            />
          ))
        )}
      </div>
      <div ref={loadMoreRef} className='flex items-center justify-center'>
        {isFetchingNextPage && <DotLoading />}
      </div>
    </>
  );
}
