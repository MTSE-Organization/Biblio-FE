import { ProductAutoType } from '@/types';

import BookCardSkeleton from '@/components/app/book/book-card-skeleton';
import { NoData } from '@/components/no-data';
import { BookCard } from '@/components/app/book';

export default function SearchResult({
  books,
  loading
}: {
  books: ProductAutoType[];
  loading: boolean;
}) {
  return (
    <div className=''>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
        {!loading &&
          books?.map((book, index) => <BookCard book={book} key={index} />)}
        {loading &&
          Array(10)
            .fill(0)
            .map((_, i) => <BookCardSkeleton key={i} />)}
      </div>
      {books.length == 0 && !loading && <NoData />}
    </div>
  );
}
