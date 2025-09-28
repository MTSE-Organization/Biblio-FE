'use client';

import { BookList } from '@/components/app/book';
import { useProductListCategoryQuery } from '@/queries';
import { useInView } from 'react-intersection-observer';

export default function BookSimilarCategoryList({ id }: { id: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '100px' });
  const query = useProductListCategoryQuery({
    id,
    enabled: inView
  });
  const products = query.data?.data?.content || [];
  return (
    <div
      ref={ref}
      className='mt-4 rounded-lg bg-white p-4 shadow-[0px_0px_10px_2px] shadow-gray-200'
    >
      <BookList
        loading={query.isLoading || query.isFetching}
        title={'Sách cùng danh mục'}
        books={products}
      />
    </div>
  );
}
