'use client';

import { Button } from '@/components/form';
import { Modal } from '@/components/modal';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import useDisclosure from '@/hooks/use-disclosure';
import { logger } from '@/logger';
import { useRefundOrderMutation } from '@/queries';
import { useAppLoadingStore } from '@/store/use-app-loading-store';
import { notify } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function RefundButton({
  orderId,
  onSuccess
}: {
  orderId: string;
  onSuccess?: () => void;
}) {
  const { opened, open, close } = useDisclosure();
  const handleOpenReviewModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    open();
  };
  return (
    <>
      <Button
        onClick={handleOpenReviewModal}
        className='bg-amber-500 hover:bg-amber-500/80'
        variant={'primary'}
      >
        Yêu cầu trả hàng/hoàn tiền
      </Button>
      <RefundModal
        opened={opened}
        onClose={close}
        orderId={orderId}
        onSuccess={onSuccess}
      />
    </>
  );
}

function RefundModal({
  orderId,
  opened,
  onClose,
  onSuccess
}: {
  orderId: string;
  onClose: () => void;
  opened: boolean;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const { withLoading } = useAppLoadingStore();
  const [refundReason, setRefundReason] = useState('');
  const refundOrderMutation = useRefundOrderMutation();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRefundReason(e.target.value);
  };

  const handleRefundOrder = async () => {
    await withLoading(
      refundOrderMutation.mutateAsync(
        { id: orderId, refundReason },
        {
          onSuccess: (res) => {
            if (res.result) {
              notify.success('Đã gửi yêu cầu hoàn trả hàng');
              queryClient.invalidateQueries({
                queryKey: ['order', orderId]
              });
              onClose();
              onSuccess?.();
            }
          },
          onError: (error) => {
            logger.error('Error whiling refund order:', error);
            notify.error('Có lỗi xảy ra');
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
            <h3 className='font-semibold'>Gửi yêu cầu hoàn trả</h3>
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

        <div className='p-4'>
          <Textarea
            onChange={(e) => handleChange(e)}
            placeholder='Hãy cho chúng tôi biết lý do bạn muốn hoàn trả hàng'
            className='order-note focus-visible:ring-green-primary max-h-80 min-h-40 overflow-auto focus-visible:border-transparent focus-visible:ring-2 focus-visible:outline-none'
          />
        </div>

        <Separator />

        <div className='flex justify-end p-4'>
          <Button
            variant={'primary'}
            onClick={handleRefundOrder}
            disabled={refundReason.length === 0}
          >
            Gửi yêu cầu
          </Button>
        </div>
      </div>
    </Modal>
  );
}
