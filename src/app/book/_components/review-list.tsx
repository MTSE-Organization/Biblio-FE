import { useReviewListQuery } from '@/queries/review.query';
import ReviewItem from './review-item';
import { NoData } from '@/components/no-data';

export default function ReviewList({ productId }: { productId: string }) {
  const reviewListQuery = useReviewListQuery({
    params: { productId },
    enabled: !!productId
  });

  const reviews = reviewListQuery?.data?.data?.content;

  return (
    <div className='flex w-full flex-col'>
      {reviews?.length ? (
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)
      ) : (
        <NoData content='Không có review' />
      )}
    </div>
  );
}
