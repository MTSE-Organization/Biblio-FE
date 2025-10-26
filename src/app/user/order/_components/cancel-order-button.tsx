'use client';

import { Button } from '@/components/form';
import { CircleLoading } from '@/components/loading';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { logger } from '@/logger';
import { useCancelOrderMutation } from '@/queries';
import { useAppLoadingStore } from '@/store/use-app-loading-store';
import { notify } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Info } from 'lucide-react';
import React from 'react';

export default function CancelOrderButton({
  orderId,
  disabled = false
}: {
  orderId: string;
  disabled?: boolean;
}) {
  const { withLoading } = useAppLoadingStore();
  const cancelOrderMutation = useCancelOrderMutation();
  const queryClient = useQueryClient();

  const handleCancel = async () => {
    await withLoading(
      cancelOrderMutation.mutateAsync(orderId, {
        onSuccess: (res) => {
          if (res.result) {
            notify.success('Hủy đơn hàng thành công');
            queryClient.refetchQueries({
              queryKey: ['order-list']
            });
          }
        },
        onError: (error) => {
          logger.error('Error while canceling order', error);
          notify.error('Có lỗi xảy ra');
        }
      })
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>
          <Button
            disabled={disabled}
            variant={'outline'}
            className='text-destructive border-destructive hover:opacity-80'
          >
            Hủy đơn hàng
          </Button>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-0! data-[state=closed]:slide-out-to-top-0! data-[state=open]:slide-in-from-left-0! data-[state=open]:slide-in-from-top-0! top-[30%] p-4'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2 text-sm font-normal'>
            <Info className='size-8 fill-orange-500 stroke-white' />
            Bạn có chắc chắn muốn hủy đơn hàng?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center text-justify'></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant='outline'
              className='border-red-500 text-red-500 transition-all duration-200 ease-linear hover:bg-transparent hover:text-red-500/80'
            >
              Không
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction
            className='bg-green-primary hover:bg-green-primary/80 cursor-pointer transition-all duration-200 ease-linear'
            asChild
          >
            <Button variant={'outline'} onClick={handleCancel}>
              {cancelOrderMutation.isPending ? <CircleLoading /> : 'Có'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
