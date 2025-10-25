'use client';

import { useEffect, useRef } from 'react';
import NotificationItem from '@/app/user/notification/_components/notification-item';
import NotificationItemSkeleton from '@/app/user/notification/_components/notification-item-skeleton';
import { List } from '@/components/list';
import { NoData } from '@/components/no-data';
import { DotLoading } from '@/components/loading';
import {
  useCountUnreadNotificationQuery,
  useDeleteNotificationMutation,
  useInfiniteNotificationListQuery,
  useReadAllNotificationMutation,
  useDeleteAllNotificationMutation
} from '@/queries';
import { useAuthStore } from '@/store';
import { notify } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/form';
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
import { Separator } from '@/components/ui/separator';
import { CheckCheck, Info, Trash } from 'lucide-react';

export default function NotificationList() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useAuthStore();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteNotificationListQuery({
      enabled: true,
      params: { size: 8 }
    });

  const readAllNotificationMutation = useReadAllNotificationMutation();
  const countUnreadNotificationQuery = useCountUnreadNotificationQuery();
  const deleteAllNotificationMutation = useDeleteAllNotificationMutation();
  const deleteNotificationMutation = useDeleteNotificationMutation();

  const unreadCount = countUnreadNotificationQuery.data?.data?.count || 0;
  const notificationList =
    data?.pages.flatMap((page) => page.data.content) || [];

  useEffect(() => {
    socket?.on('notification', () => {
      queryClient.invalidateQueries({ queryKey: ['notification-list'] });
      queryClient.invalidateQueries({
        queryKey: ['count-unread-notification']
      });
    });
  }, [socket]);

  const handleReadAllNotification = async () => {
    if (unreadCount) {
      await readAllNotificationMutation.mutateAsync();
      queryClient.invalidateQueries({ queryKey: ['notification-list'] });
      queryClient.invalidateQueries({
        queryKey: ['count-unread-notification']
      });
    }
  };

  const handleDeleteAllNotification = async () => {
    await deleteAllNotificationMutation.mutateAsync(undefined, {
      onSuccess: (res) => {
        if (res.result) {
          notify.success('Xóa tất cả thông báo thành công');
          queryClient.invalidateQueries({ queryKey: ['notification-list'] });
          queryClient.invalidateQueries({
            queryKey: ['count-unread-notification']
          });
        }
      }
    });
  };

  const handleDeleteClick = async (id: string) => {
    await deleteNotificationMutation.mutateAsync(id, {
      onSuccess: (res) => {
        if (res.result) {
          notify.success('Xóa thông báo thành công');
          queryClient.invalidateQueries({ queryKey: ['notification-list'] });
          queryClient.invalidateQueries({
            queryKey: ['count-unread-notification']
          });
        }
      }
    });
  };

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='overflow-hidden rounded-lg bg-white shadow-[0px_0px_10px_2px] shadow-gray-200'>
      {isLoading ? (
        <>
          <div className='flex items-center justify-between px-4'>
            <span>Thông báo ({unreadCount})</span>
            <div className='flex items-center gap-x-2'>
              <Button
                variant='ghost'
                className='pr-0! transition-all duration-200 ease-linear hover:text-gray-400'
              >
                Đọc tất cả
                <CheckCheck />
              </Button>
              <Separator orientation='vertical' className='h-5!' />
              <Button
                variant='ghost'
                className='text-destructive hover:text-destructive/80 px-0! transition-all duration-200 ease-linear'
              >
                Xóa tất cả
                <Trash />
              </Button>
            </div>
          </div>
          <Separator />
          {[...Array(10)].map((_, i) => (
            <NotificationItemSkeleton key={i} />
          ))}
        </>
      ) : notificationList.length === 0 ? (
        <NoData className='min-h-[80vh]' content='Không có thông báo nào' />
      ) : (
        <>
          <div className='flex items-center justify-between px-4'>
            <span>Thông báo ({unreadCount})</span>
            <div className='flex items-center gap-x-2'>
              <Button
                variant='ghost'
                onClick={handleReadAllNotification}
                className='pr-0! transition-all duration-200 ease-linear hover:text-gray-400'
              >
                Đọc tất cả
                <CheckCheck />
              </Button>
              <Separator orientation='vertical' className='h-5!' />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span>
                    <Button
                      variant={'ghost'}
                      className='text-destructive hover:text-destructive/80 px-0! transition-all duration-200 ease-linear'
                    >
                      Xóa tất cả
                      <Trash />
                    </Button>
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-0! data-[state=closed]:slide-out-to-top-0! data-[state=open]:slide-in-from-left-0! data-[state=open]:slide-in-from-top-0! top-[30%] max-w-lg p-4'>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='content flex flex-nowrap items-center gap-2 text-sm font-normal'>
                      <Info className='size-8 fill-orange-500 stroke-white' />
                      Bạn có chắc chắn muốn xóa tất cả thông báo không ?
                    </AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
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
                      onClick={handleDeleteAllNotification}
                      className='bg-green-primary hover:bg-green-primary/80 cursor-pointer transition-all duration-200 ease-linear'
                    >
                      Có
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <Separator />

          <List className='flex flex-col'>
            {notificationList.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onDeleteClick={() => handleDeleteClick(notification.id)}
              />
            ))}
          </List>

          <div ref={loadMoreRef} className='flex items-center justify-center'>
            {isFetchingNextPage && <DotLoading />}
          </div>
        </>
      )}
    </div>
  );
}
