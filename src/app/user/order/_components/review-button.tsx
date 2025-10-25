'use client';
import {
  angryIcon,
  happyIcon,
  neutralIcon,
  sadIcon,
  veryHappyIcon
} from '@/assets';
import { Button } from '@/components/form';
import { Modal } from '@/components/modal';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import useDisclosure from '@/hooks/use-disclosure';
import { cn } from '@/lib';
import { logger } from '@/logger';
import { useCreateReviewMutation } from '@/queries/review.query';
import { useAppLoadingStore } from '@/store/use-app-loading-store';
import { notify } from '@/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ReviewButton({
  productId,
  productVariantId,
  orderId,
  onSuccess
}: {
  productId: string;
  productVariantId: string;
  orderId: string;
  onSuccess: () => void;
}) {
  const { opened, open, close } = useDisclosure();
  const handleOpenReviewModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    open();
  };
  return (
    <>
      <Button
        className='h-8 py-0!'
        onClick={handleOpenReviewModal}
        variant={'primary'}
      >
        Đánh giá
      </Button>
      <ReviewModal
        opened={opened}
        onClose={close}
        productId={productId}
        productVariantId={productVariantId}
        orderId={orderId}
        onSuccess={onSuccess}
      />
    </>
  );
}

const ratings = [
  { icon: angryIcon, text: 'Rất tệ' },
  { icon: sadIcon, text: 'Không hài lòng' },
  { icon: neutralIcon, text: 'Bình thường' },
  { icon: happyIcon, text: 'Hài lòng' },
  { icon: veryHappyIcon, text: 'Rất hài lòng' }
];

function ReviewModal({
  opened,
  onClose,
  productId,
  productVariantId,
  orderId,
  onSuccess
}: {
  opened: boolean;
  onClose: () => void;
  productId: string;
  productVariantId: string;
  orderId: string;
  onSuccess: () => void;
}) {
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [content, setContent] = useState('');
  const { withLoading } = useAppLoadingStore();

  const reviewMutation = useCreateReviewMutation();

  const handleSelect = (index: number) => {
    setSelectedRating(index + 1);
  };

  const handleCreateReview = async () => {
    await withLoading(
      reviewMutation.mutateAsync(
        { productId, rate: selectedRating, content, productVariantId, orderId },
        {
          onSuccess: () => {
            notify.success('Đánh giá sách thành công');
            onSuccess();
            onClose();
          },
          onError: (error) => {
            notify.error('Đã có lỗi xảy ra');
            logger.error(error);
          }
        }
      )
    );
  };

  return (
    <Modal open={opened} onClose={onClose} className='p-4'>
      <div className='flex max-h-[90vh] w-140 flex-col'>
        <div className='flex items-center gap-x-4 py-2'>
          <div className='pl-4'>
            <h3 className='font-semibold'>Đánh giá sản phẩm</h3>
          </div>
          <Button
            onClick={onClose}
            className='text-destructive ml-auto'
            variant={'ghost'}
          >
            <X />
          </Button>
        </div>
        <Separator />
        <div className='my-5 flex flex-col items-center justify-center gap-6 px-4'>
          <p className='text-base font-medium'>
            {ratings[selectedRating - 1].text}
          </p>
          <div className='relative h-28 w-28 overflow-hidden'>
            <div
              className='flex flex-col items-center gap-3 transition-transform duration-500 ease-in-out'
              style={{
                transform: `translateY(-${(selectedRating - 1) * 7}rem)`
              }}
            >
              {ratings.map((rating, index) => (
                <Image
                  key={index}
                  src={rating.icon}
                  width={100}
                  height={100}
                  alt={rating.text}
                  className='mx-auto'
                />
              ))}
            </div>
          </div>

          <div className='flex gap-3'>
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className='cursor-pointer transition-transform hover:scale-110'
              >
                <svg
                  viewBox='0 0 576 512'
                  width={40}
                  className={cn({
                    'fill-yellow-400': selectedRating >= index + 1,
                    'fill-gray-300': selectedRating < index + 1
                  })}
                >
                  <path d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z' />
                </svg>
              </button>
            ))}
          </div>
          <p>Chọn sao để đánh giá</p>
        </div>
        <div className='px-4'>
          <Textarea
            placeholder='Hãy chia sẻ cảm nhận của bạn về sản phẩm này nhé!'
            onChange={(e) => setContent(e.target.value)}
            className='order-note focus-visible:ring-green-primary max-h-80 min-h-40 overflow-auto focus-visible:border-transparent focus-visible:ring-2 focus-visible:outline-none'
          />
        </div>
        <div className='flex justify-end p-4'>
          <Button
            variant={'primary'}
            disabled={content.length === 0}
            onClick={handleCreateReview}
          >
            Gửi đánh giá
          </Button>
        </div>
      </div>
    </Modal>
  );
}
