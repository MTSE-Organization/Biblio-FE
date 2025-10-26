'use client';

import { Button } from '@/components/form';
import { FaChevronDown } from 'react-icons/fa';
import { RiNotification3Line } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { emptyNotification } from '@/assets';
import route from '@/routes';
import { List, ListItem } from '@/components/list';
import { useAuthStore } from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCountUnreadNotificationQuery,
  useMarkReadNotificationMutation,
  useNotificationListQuery,
  useReadAllNotificationMutation
} from '@/queries';
import { notify, renderImageUrl } from '@/utils';
import { NotificationResType } from '@/types';
import { DATE_TIME_FORMAT } from '@/constants';
import { formatDate } from 'date-fns';
import { NoData } from '@/components/no-data';
import { CheckCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib';
import { logger } from '@/logger';

export default function DropdownNotification() {
  const { socket, profile } = useAuthStore();
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const notificationListQuery = useNotificationListQuery({ enabled: open });
  const countUnreadNotificationQuery = useCountUnreadNotificationQuery();
  const readAllNotificationMutation = useReadAllNotificationMutation();

  const notificationList = notificationListQuery.data?.data?.content || [];
  const unreadCount = countUnreadNotificationQuery.data?.data?.count || 0;

  const loading = notificationListQuery.isLoading;

  useEffect(() => {
    socket?.on('notification', (data: NotificationResType) => {
      logger.info('🚀 ~ DropdownNotification ~ notification:', data);
      notify.info(data.title || 'Bạn có thông báo mới !');
      notificationListQuery.refetch();
      countUnreadNotificationQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ['notification-list'] });
      queryClient.invalidateQueries({
        queryKey: ['count-unread-notification']
      });
    });
  }, [socket]);

  const handleReadAllNotification = async () => {
    if (unreadCount) {
      await readAllNotificationMutation.mutateAsync();
      // notificationListQuery.refetch();
      // countUnreadNotificationQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ['notification-list'] });
      queryClient.invalidateQueries({
        queryKey: ['count-unread-notification']
      });
    }
  };

  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        variant='ghost'
        className='group hover:text-green-primary size-full rounded-full p-0! transition-all duration-200 ease-linear hover:bg-transparent! focus:outline-none focus-visible:ring-0'
      >
        <div className='relative'>
          <RiNotification3Line className='size-[21px]' />
          <div className='group-hover:bg-green-primary absolute -top-1.5 left-2 flex items-center justify-center rounded-full bg-black p-1 py-0 text-xs text-white transition-all duration-200 ease-linear'>
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        </div>
        Thông báo
        <FaChevronDown
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            style={{ transformOrigin: '420px -15px' }}
            className="absolute -right-4 mt-2 w-125 before:absolute before:-top-4 before:h-4 before:w-full before:cursor-pointer before:bg-transparent before:content-['']"
          >
            <div className='absolute -top-2 right-16 h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-white group-hover:border-b-green-100' />

            <List
              className={cn(
                'max-h-[80vh] min-h-[45vh] overflow-hidden rounded-lg bg-white shadow-[0px_-3px_24px_rgba(149,157,165,0.5)] transition-all duration-200 ease-linear group-hover:border-green-100 group-hover:bg-green-50'
              )}
            >
              {!profile ? (
                <ListItem className='flex min-h-[45vh] w-full flex-col items-center justify-center'>
                  <h2 className='mb-2'>
                    <Link
                      href={route.login}
                      className='text-green-primary transition-all ease-linear hover:opacity-80'
                    >
                      Đăng nhập
                    </Link>
                    &nbsp;để xem thông báo
                  </h2>
                  <Image
                    src={emptyNotification.src}
                    alt='Empty notification'
                    width={200}
                    height={200}
                  />
                </ListItem>
              ) : notificationList.length === 0 ? (
                <ListItem>
                  <NoData
                    content='Bạn chưa có thông báo nào'
                    className='min-h-[45vh]'
                  />
                </ListItem>
              ) : loading ? (
                <>
                  <div className='flex items-center justify-between px-4'>
                    <span>Thông báo (0)</span>
                    <Button
                      variant='ghost'
                      onClick={handleReadAllNotification}
                      className='pr-0! transition-all duration-200 ease-linear hover:text-gray-400'
                    >
                      Đọc tất cả
                      <CheckCheck />
                    </Button>
                  </div>
                  <Separator />
                  {[...Array(5)].map((_, i) => (
                    <NotificationItemSkeleton key={i} />
                  ))}
                  <Separator className='mt-2' />
                  <Button
                    variant='ghost'
                    className='skeleton mx-auto block w-full rounded-none! hover:bg-gray-200'
                  />
                </>
              ) : (
                <>
                  <div className='flex items-center justify-between px-4'>
                    <span>Thông báo ({unreadCount})</span>
                    <Button
                      variant='ghost'
                      onClick={handleReadAllNotification}
                      className='pr-0! transition-all duration-200 ease-linear hover:text-gray-400'
                    >
                      Đọc tất cả
                      <CheckCheck />
                    </Button>
                  </div>
                  <Separator />
                  <List className='flex min-h-[40vh] flex-col overflow-y-auto rounded-md'>
                    {notificationList.slice(0, 4).map((notification) => (
                      <NoficationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))}
                  </List>
                  <Separator />
                  <Link href={route.user.notification}>
                    <Button
                      variant='ghost'
                      className='mx-auto block w-full rounded-none hover:bg-zinc-50'
                    >
                      Xem tất cả
                    </Button>
                  </Link>
                </>
              )}
            </List>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function NoficationItem({
  notification
}: {
  notification: NotificationResType;
}) {
  const queryClient = useQueryClient();
  const markReadNotificationMutation = useMarkReadNotificationMutation();

  const handleMarkReadNotification = async (id: string) => {
    await markReadNotificationMutation.mutateAsync(id);
    // queryClient.refetchQueries({ queryKey: ['count-unread-notification'] });
    queryClient.invalidateQueries({ queryKey: ['count-unread-notification'] });
    // queryClient.refetchQueries({ queryKey: ['notification-list'] });
    queryClient.invalidateQueries({ queryKey: ['notification-list'] });
  };

  const data = JSON.parse(notification.data) as { orderId: string };

  return (
    <ListItem
      className={
        !notification.seen
          ? 'cursor-pointer bg-gray-100 transition-all duration-200 ease-linear not-last:border-b hover:bg-gray-50'
          : 'not-last:border-b'
      }
    >
      <Link
        onClick={() => handleMarkReadNotification(notification.id)}
        className='flex gap-x-4 p-4'
        href={`${route.user.order}/${data.orderId}`}
      >
        <div className='h-18 w-12 shrink-0'>
          <Image
            src={renderImageUrl(notification.imageUrl)}
            width={52}
            height={72}
            alt={notification.title}
            unoptimized
            className={
              !notification.seen
                ? 'h-full w-full bg-gray-100 object-cover transition-all duration-200 ease-linear hover:bg-zinc-200'
                : 'h-full w-full object-cover'
            }
          />
        </div>
        <div className='flex flex-col justify-between'>
          <h3>{notification.title}</h3>
          <span className='text-xs text-gray-400'>
            {formatDate(notification.createdDate, DATE_TIME_FORMAT)}
          </span>
        </div>
      </Link>
    </ListItem>
  );
}

function NotificationItemSkeleton() {
  return (
    <ListItem className='flex gap-x-4 p-2'>
      <div className='skeleton h-18 w-15'></div>
      <div className='flex flex-col justify-between'>
        <h3 className='skeleton h-5 w-50'></h3>
        <span className='skeleton h-5 w-20 text-xs text-gray-400'></span>
      </div>
    </ListItem>
  );
}
