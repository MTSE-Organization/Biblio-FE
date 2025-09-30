'use client';

import { Col, Row } from '@/components/form';
import { useParams } from 'next/navigation';
import { useProductQuery } from '@/queries';
import {
  BookDetailInfo,
  BookDetailInfoSkeleton,
  BookGallery,
  BookGallerySkeleton,
  BookSimilarCategoryList,
  BookTabs
} from '@/app/book/_components';

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const id = slug.split('.')[1];
  const bookQuery = useProductQuery(id);
  const book = bookQuery.data?.data;
  const loading = bookQuery.isLoading || bookQuery.isFetching;
  return (
    <>
      <Row className='my-0 gap-x-8 rounded-lg bg-white p-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
        <Col
          span={10}
          className='w-full min-[768px]:w-1/2 min-[1200px]:w-10/24 min-[1400px]:w-1/3'
        >
          {loading ? (
            <BookGallerySkeleton />
          ) : (
            <BookGallery images={book?.images} />
          )}
        </Col>
        <Col
          span={14}
          className='w-full min-[768px]:w-1/2 min-[1200px]:w-12/24 min-[1400px]:w-2/3'
        >
          {loading ? (
            <BookDetailInfoSkeleton />
          ) : (
            <BookDetailInfo book={book} />
          )}
        </Col>
      </Row>
      <BookTabs book={book} />
      <BookSimilarCategoryList id={book?.id as string} />
    </>
  );
}
