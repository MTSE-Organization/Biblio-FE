import { useReviewListQuery } from '@/queries/review.query';
import ReviewItem from './review-item';

export default function ReviewList({ productId }: { productId: string }) {
  const reviewListQuery = useReviewListQuery({
    params: { productId },
    enabled: !!productId
  });

  const reviews = reviewListQuery?.data?.data?.content;

  return (
    <div className='flex w-full flex-col'>
      {reviews?.map((review, index) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}
