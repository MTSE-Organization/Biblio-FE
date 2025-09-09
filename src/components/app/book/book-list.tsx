import { ApiResponseList, ProductResType } from '@/types';
import BookCard from './book-card';
import { UseQueryResult } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

function BookList({
  title,
  books
}: {
  title: string;
  books: ProductResType[];
}) {
  return (
    <div className='mt-10 mb-12 text-center capitalize'>
      <h2 className='mb-10 text-4xl font-bold'>{title}</h2>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
        {books.map((book, index) => (
          <BookCard book={book} key={index} />
        ))}
      </div>
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
    <div ref={ref}>
      <BookList title={title} books={query.data?.data.content || []} />
    </div>
  );
}
