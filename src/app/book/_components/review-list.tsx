import { useReviewListQuery } from '@/queries/review.query';
import ReviewItem from './review-item';
import { NoData } from '@/components/no-data';
import { Col } from '@/components/form';
import ReviewItemSkeleton from '@/app/book/_components/review-item-skeleton';

export default function ReviewList({ productId }: { productId: string }) {
  const reviewListQuery = useReviewListQuery({
    params: { productId },
    enabled: !!productId
  });

  const reviews = reviewListQuery?.data?.data?.content;
  const loading = reviewListQuery.isLoading || reviewListQuery.isFetching;

  return (
    <Col gutter={0}>
      {loading ? (
        [...Array(8)].map((_, index) => <ReviewItemSkeleton key={index} />)
      ) : reviews?.length ? (
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)
      ) : (
        <NoData content='Chưa có đánh giá' className='min-h-[30vh]' />
      )}
    </Col>
  );
}
