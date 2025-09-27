'use client';

import BookList from '@/components/app/book/book-list';
import { ApiResponseList, ProductAutoType } from '@/types';
import { UseQueryResult } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export default function LazyBookList({
  title,
  useQueryHook
}: {
  title: string;
  useQueryHook: (args: {
    enabled: boolean;
  }) => UseQueryResult<ApiResponseList<ProductAutoType>, Error>;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '100px' });
  const query = useQueryHook({ enabled: inView });

  return (
    <div
      ref={ref}
      className='mb-4 rounded-lg bg-white p-4 shadow-[0px_0px_10px_2px] shadow-gray-200'
    >
      <BookList
        loading={query.isLoading || query.isFetching}
        title={title}
        books={query.data?.data.content || []}
      />
    </div>
  );
}
