'use client';

import { cn } from '@/lib';
import { Eye, Heart, MapPin, User } from 'lucide-react';
import { List, ListItem } from '@/components/list';
import { LuNotepadText } from 'react-icons/lu';
import { RiNotification3Line } from 'react-icons/ri';
import { useIsMounted } from '@/hooks';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import route from '@/routes';

export default function UserSidebar() {
  const pathname = usePathname();
  const isMounted = useIsMounted();

  const userSidebars = [
    {
      key: 'profile',
      path: route.user.profile,
      label: 'Tài khoản',
      icon: User
    },
    {
      key: 'address',
      path: route.user.address,
      label: 'Địa chỉ',
      icon: MapPin
    },
    {
      key: 'notification',
      path: route.user.notification,
      label: 'Thông báo',
      icon: RiNotification3Line
    },
    {
      key: 'order',
      path: route.user.order,
      label: 'Đơn hàng',
      icon: LuNotepadText
    },
    {
      key: 'favorite',
      path: route.user.favorite,
      label: 'Yêu thích',
      icon: Heart
    },
    {
      key: 'viewed-history',
      path: route.user.viewedHistory,
      label: 'Lịch sử xem',
      icon: Eye
    }
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <List className='h-full'>
      {userSidebars.map((item) => (
        <ListItem
          key={item.key}
          className={cn(
            'hover:text-green-primary border-b border-solid border-gray-200 transition-all duration-200 ease-linear last:border-b-0',
            pathname.includes(item.path) && 'text-green-primary'
          )}
        >
          <Link href={item.path} className='flex items-center gap-x-2 p-4'>
            <item.icon className='size-5' />
            {item.label}
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
