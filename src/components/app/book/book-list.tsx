import { ProductAutoType } from '@/types';
import BookCard from './book-card';
import BookCardSkeleton from '@/components/app/book/book-card-skeleton';
import { NoData } from '@/components/no-data';

export default function BookList({
  title,
  books,
  loading
}: {
  title?: string;
  books: ProductAutoType[];
  loading: boolean;
}) {
  return (
    <div className='text-center'>
      <h2 className='mb-2 border-b-2 border-solid border-gray-200 pb-4 text-xl font-bold'>
        {title}
      </h2>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5'>
        {!loading &&
          books?.map((book, index) => <BookCard book={book} key={index} />)}
        {loading &&
          Array(10)
            .fill(0)
            .map((_, i) => <BookCardSkeleton key={i} />)}
      </div>
      {books.length == 0 && !loading && (
        <div className='pointer-events-none flex w-full flex-col items-center justify-center gap-5 select-none'>
          <NoData className='max-[1560px]:min-h-[75vh]' />
        </div>
      )}
    </div>
  );
}
