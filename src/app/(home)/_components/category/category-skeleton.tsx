import { Col } from '@/components/form';

export default function CategorySkeleton() {
  return (
    <Col>
      <div>
        <div className='h-50 w-50 animate-pulse rounded-lg bg-gray-200'></div>
      </div>
      <p className='mt-4 h-5 w-50 animate-pulse rounded-lg bg-gray-200 text-center text-base font-medium'></p>
    </Col>
  );
}
