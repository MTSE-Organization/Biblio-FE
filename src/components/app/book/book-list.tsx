import { ProductAutoType } from '@/types';
import BookCard from './book-card';
import Image from 'next/image';
import { emptyList } from '@/assets';
import BookCardSkeleton from '@/components/app/book/book-card-skeleton';

export default function BookList({
  title,
  books,
  loading
}: {
  title: string;
  books: ProductAutoType[];
  loading: boolean;
}) {
  return (
    <div className='my-4 text-center'>
      <h2 className='mb-4 border-b-2 border-solid border-gray-200 pb-4 text-4xl font-bold'>
        {title}
      </h2>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5'>
        {!loading &&
          books.map((book, index) => <BookCard book={book} key={index} />)}
        {loading &&
          Array(10)
            .fill(0)
            .map((_, i) => <BookCardSkeleton key={i} />)}
      </div>
      {books.length == 0 && !loading && (
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
