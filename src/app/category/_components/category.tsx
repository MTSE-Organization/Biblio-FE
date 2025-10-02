'use client';

import { BookList } from '@/components/app/book';
import { DotLoading } from '@/components/loading';
import { useCategoryQuery, useInfiniteProductQuery } from '@/queries';
import { getIdFromSlug } from '@/utils';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Category() {
  const params = useParams<{ slug: string }>();
  const id = getIdFromSlug(params.slug);

  const categoryQuery = useCategoryQuery({ id, enabled: true });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteProductQuery({
      enabled: true,
      params: {
        categoryId: id,
        size: 5
      }
    });

  const products = data?.pages.flatMap((page) => page.data.content) || [];
  const category = categoryQuery.data?.data;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='rounded-lg bg-white p-4'>
      <BookList
        loading={isLoading}
        title={category?.name as string}
        books={products}
      />

      <div ref={loadMoreRef} className='flex items-center justify-center'>
        {isFetchingNextPage && <DotLoading />}
      </div>
    </div>
  );
}
