'use client';
import OrderItem from '@/app/user/order/_components/order-item';
import OrderItemSkeleton from '@/app/user/order/_components/order-item-skeleton';
import { Button } from '@/components/form';
import { DotLoading } from '@/components/loading';
import { NoData } from '@/components/no-data';
import { ORDER_STATUS_ALL, orderStatuses } from '@/constants';
import { cn } from '@/lib';
import { useInfiniteOrderListQuery } from '@/queries';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

export default function OrderList() {
  const queryClient = useQueryClient();
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
      <div className='mb-4 grid w-full grid-cols-6 flex-wrap items-center justify-start gap-y-1 overflow-x-auto rounded-lg bg-white px-4 py-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
        {orderStatuses.map((status) => {
          const isActive = currentStatus === status.value;
          return (
            <Button
              key={status.value}
              variant='ghost'
              onClick={() => setCurrentStatus(status.value)}
              className={cn(
                'rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-200',
                isActive
                  ? 'border-dark-cyan bg-dark-cyan/10 text-dark-cyan'
                  : 'border-transparent text-gray-600 hover:bg-gray-50'
              )}
            >
              {status.label}
            </Button>
          );
        })}
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
