'use client';

import { List, ListItem } from '@/components/list';
import { cn } from '@/lib';
import route from '@/routes';
import { MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiNotification3Line } from 'react-icons/ri';
import { LuNotepadText } from 'react-icons/lu';

export default function UserSidebar() {
  const pathname = usePathname();
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
    }
  ];
  return (
    <List className='h-full'>
      {userSidebars.map((userSidebar) => (
        <ListItem
          className={cn(
            'hover:text-green-primary border-b border-solid border-gray-200 transition-all duration-200 ease-linear',
            {
              'text-green-primary': pathname === userSidebar.path
            }
          )}
          key={userSidebar.key}
        >
          <Link
            href={userSidebar.path}
            className='flex items-center gap-x-2 p-4'
          >
            <userSidebar.icon />
            {userSidebar.label}
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
