export default function BookCardSkeleton() {
  return (
    <div className='h-full rounded-md border bg-white p-3'>
      <div className='relative flex h-auto items-center justify-center rounded-md'>
        <div className='h-70 w-full animate-pulse bg-gray-200'></div>
        <div className='text-green-primary hover:bg-green-primary absolute bottom-[-16px] z-9 flex h-9 w-9 animate-pulse cursor-pointer items-center justify-center rounded-full border bg-gray-100 hover:text-white'></div>
      </div>
      <div className='flex flex-col items-center pt-5 text-center'>
        <div className='mb-3 flex w-full flex-col items-center'>
          <p className='mb-2 line-clamp-1 h-5 animate-pulse rounded-full text-sm text-gray-500'></p>
          <div className='flex h-5 w-full animate-pulse items-center justify-center rounded-lg bg-gray-100'></div>
        </div>
        <p className='mb-2 line-clamp-1 h-5 w-full animate-pulse rounded-lg bg-gray-100 text-sm'></p>
        <p className='mb-2 line-clamp-1 h-5 w-full animate-pulse rounded-lg bg-gray-100 text-sm'></p>
      </div>
    </div>
  );
}
