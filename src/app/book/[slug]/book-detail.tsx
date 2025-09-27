'use client';
import { Col, Row } from '@/components/form';
import BookTabs from '../_components/book-tabs';
import { useParams } from 'next/navigation';
import { useProductQuery } from '@/queries';
import BookGallerySkeleton from '@/app/book/_components/book-gallery-skeleton';
import BookGallery from '@/app/book/_components/book-gallery';
import BookDetailInfoSkeleton from '@/app/book/_components/book-detail-info-skeleton';
import BookDetailInfo from '@/app/book/_components/book-detail-info';

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const id = slug.split('.')[1];
  const bookQuery = useProductQuery(id);
  const book = bookQuery.data?.data;
  const loading = bookQuery.isLoading || bookQuery.isFetching;
  return (
    <>
      <Row className='my-0 gap-x-8'>
        <Col
          span={10}
          className='mb-24 w-full min-[768px]:w-1/2 min-[1200px]:w-10/24 min-[1400px]:w-1/3'
        >
          {loading ? (
            <BookGallerySkeleton />
          ) : (
            <BookGallery images={book?.images} />
          )}
        </Col>
        <Col
          span={14}
          className='mb-24 w-full min-[768px]:w-1/2 min-[1200px]:w-12/24 min-[1400px]:w-2/3'
        >
          {loading ? (
            <BookDetailInfoSkeleton />
          ) : (
            <BookDetailInfo book={book} />
          )}
        </Col>
      </Row>
      <BookTabs />
    </>
  );
}
