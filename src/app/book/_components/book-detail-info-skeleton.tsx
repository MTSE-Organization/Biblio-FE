'use client';

import { List, ListItem } from '@/components/list';

export default function BookDetailInfoSkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='border-b border-solid border-b-gray-200 pb-5'>
        <div className='skeleton h-6 w-2/3 rounded'></div>
      </div>

      <div className='mt-5 flex items-center gap-4'>
        <div className='skeleton h-5 w-24 rounded'></div>
        <div className='skeleton h-5 w-16 rounded'></div>
        <div className='skeleton h-5 w-20 rounded'></div>
      </div>

      <List className='mt-[15px]'>
        {[...Array(8)].map((_, i) => (
          <ListItem key={i} className='flex h-8 py-[5px] text-[#777]'>
            <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
            &nbsp;
            <label className='skeleton mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'></label>
            &nbsp;
          </ListItem>
        ))}
      </List>

      <div className='mt-6 flex items-center gap-3'>
        <div className='skeleton h-6 w-32 rounded'></div>
        <div className='skeleton h-5 w-24 rounded'></div>
        <div className='skeleton h-5 w-10 rounded'></div>
      </div>

      <div className='mt-6'>
        <div className='skeleton mb-2 h-5 w-24 rounded'></div>
        <div className='flex flex-wrap gap-2'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='skeleton h-8 w-24 rounded-md border border-gray-200'
            ></div>
          ))}
        </div>
      </div>

      <div className='mt-6 flex items-center gap-3'>
        <div className='skeleton h-9 w-[90px] rounded'></div>
        <div className='skeleton h-9 w-32 rounded'></div>
        <div className='skeleton h-9 w-32 rounded'></div>
      </div>
    </div>
  );
}
