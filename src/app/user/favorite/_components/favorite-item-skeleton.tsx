import { Skeleton } from '@/components/ui/skeleton';

export default function FavoriteItemSkeleton() {
  return (
    <div className='relative flex gap-5 rounded-lg border border-gray-200 bg-white p-4 shadow-[0px_0px_10px_2px] shadow-gray-200 not-last:mb-5'>
      <div className='flex-shrink-0'>
        <Skeleton className='h-[100px] w-[100px] rounded-lg' />
      </div>

      <div className='flex flex-1 flex-col justify-between'>
        <Skeleton className='mb-3 h-5 w-2/3' />

        <div className='mb-3 flex items-center gap-3'>
          <Skeleton className='h-4 w-24' />
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-4 rounded-full' />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-24' />
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-5 w-10 rounded' />
        </div>
      </div>

      <div className='absolute right-5 bottom-5 flex items-center gap-1 text-gray-600'>
        <Skeleton className='h-5 w-5 rounded-full' />
        <Skeleton className='h-4 w-12' />
      </div>
    </div>
  );
}
