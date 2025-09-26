import { ApiResponseList, ProductResType } from '@/types';
import BookCard from './book-card';
import { UseQueryResult } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { emptyList } from '@/assets';
import BookCardSkeleton from '@/components/app/book/book-card-skeleton';

function BookList({
  title,
  books,
  loading
}: {
  title: string;
  books: ProductResType[];
  loading: boolean;
}) {
  return (
    <div className='mt-10 mb-12 text-center'>
      <h2 className='mb-4 text-4xl font-bold'>{title}</h2>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5'>
        {!loading &&
          books.map((book, index) => <BookCard book={book} key={index} />)}
        {loading &&
          Array(10)
            .fill(0)
            .map((_, i) => <BookCardSkeleton key={i} />)}
      </div>
      {books.length == 0 && (
        <div className='pointer-events-none flex w-full flex-col items-center justify-center gap-5 select-none'>
          <Image
            src={emptyList}
            width={200}
            height={200}
            quality={100}
            alt='No product founds'
          />
          <p className='text-lg font-semibold'>Không có sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}

export default function LazyBookList({
  title,
  useQueryHook
}: {
  title: string;
  useQueryHook: (args: {
    enabled: boolean;
  }) => UseQueryResult<ApiResponseList<ProductResType>, Error>;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '100px' });
  const query = useQueryHook({ enabled: inView });

  return (
    <div ref={ref} className='mb-4 rounded-lg bg-white p-4'>
      <BookList
        loading={query.isLoading || query.isFetching}
        title={title}
        books={query.data?.data.content || []}
      />
    </div>
  );
}
