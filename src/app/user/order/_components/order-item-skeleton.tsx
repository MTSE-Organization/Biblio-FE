'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib';

export default function OrderItemSkeleton() {
  return (
    <div className='relative mb-5 rounded-lg border border-gray-200 bg-white p-4 shadow-[0_0_10px_2px_rgba(0,0,0,0.05)]'>
      <div className='mb-4 flex items-center justify-between border-b border-gray-200 pb-4'>
        <div className='h-4 w-32 animate-pulse rounded bg-gray-200'></div>
        <Badge className={cn('bg-transparent py-1 text-sm')}>
          <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
        </Badge>
      </div>

      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className='mb-3 flex items-center border-b border-gray-200 pb-3'
        >
          <div className='h-[90px] w-[90px] flex-shrink-0 animate-pulse rounded-lg bg-gray-200'></div>

          <div className='ml-6 flex h-full w-full items-stretch justify-between'>
            <div className='flex flex-1 flex-col justify-between'>
              <div className='h-5 w-3/4 animate-pulse rounded bg-gray-200'></div>
              <div className='mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200'></div>
              <div className='mt-2 h-4 w-10 animate-pulse rounded bg-gray-200'></div>
            </div>

            <div className='flex flex-col items-end justify-center'>
              <div className='h-5 w-20 animate-pulse rounded bg-gray-200'></div>
              <div className='mt-2 h-4 w-14 animate-pulse rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      ))}

      <div className='mt-3 text-right'>
        <div className='ml-auto h-5 w-48 animate-pulse rounded bg-gray-200'></div>
      </div>

      <div className='mt-4 flex justify-end gap-2'>
        <div className='h-9 w-24 animate-pulse rounded bg-gray-200'></div>
        <div className='h-9 w-20 animate-pulse rounded bg-gray-200'></div>
      </div>
    </div>
  );
}
