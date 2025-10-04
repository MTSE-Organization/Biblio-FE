'use client';

import OrderItem from '@/app/user/order/_components/order-item';
import { Button } from '@/components/form';
import { ORDER_STATUS_ALL, orderStatuses } from '@/constants';
import { cn } from '@/lib';
import { useState } from 'react';

export default function OrderList() {
  const [currentStatus, setCurrentStatus] = useState<number>(ORDER_STATUS_ALL);
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
      <div className='mt-5'>
        {Array.from({ length: 4 }).map((_, index) => (
          <OrderItem key={index} />
        ))}
      </div>
    </>
  );
}
