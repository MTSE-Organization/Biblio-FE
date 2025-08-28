'use client';

import { Button } from '@/components/form';
import { FaChevronDown } from 'react-icons/fa';
import { RiUser3Line } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import ListItem from '@/components/list/ListItem';
import Link from 'next/link';
import { useState } from 'react';
import route from '@/routes';
import { getData, notify, removeData } from '@/utils';
import { storageKeys } from '@/constants';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/queries';
import { logger } from '@/logger';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store';
import ButtonLoading from '@/components/loading/button-loading';

export default function DropdownAccount() {
  const logoutMutation = useLogoutMutation();
  const [open, setOpen] = useState(false);
  const accessToken = getData(storageKeys.ACCESS_TOKEN);
  const router = useRouter();
  const { setAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      const res = await logoutMutation.mutateAsync();
      if (res.result) {
        removeData(storageKeys.ACCESS_TOKEN);
        notify.success('Đăng xuất thành công');
        setAuthenticated(false);
        router.push(route.home);
      }
    } catch (error) {
      logger.error('Error while logging out: ', error);
      notify.error('Đăng xuất thất bại');
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
        className='text-md hover:text-green-primary group size-full rounded-full p-0! hover:bg-transparent! focus:outline-none focus-visible:ring-0'
      >
        <RiUser3Line className='size-[21px]' />
        Tài khoản
        <FaChevronDown
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            style={{ transformOrigin: '95px -15px' }}
            className='group absolute -left-8 mt-2 w-50 before:absolute before:-top-4 before:h-4 before:w-full before:cursor-pointer before:bg-transparent before:content-[""]'
          >
            <div className='absolute -top-2 left-25 h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-white' />

            <ul className='overflow-hidden rounded bg-white shadow-[0px_-3px_24px_rgba(149,157,165,0.5)]'>
              {!accessToken ? (
                <>
                  <ListItem>
                    <Link
                      className='block px-4 py-2 transition-all duration-200 ease-linear hover:bg-slate-100'
                      href={route.login}
                    >
                      Đăng nhập
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      className='block px-4 py-2 transition-all duration-200 ease-linear hover:bg-slate-100'
                      href={route.register}
                    >
                      Đăng ký
                    </Link>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem>
                    <Link
                      className='block px-4 py-2 transition-all duration-200 ease-linear hover:bg-slate-100'
                      href={route.user.profile}
                    >
                      Thông tin cá nhân
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant={'ghost'}
                      onClick={handleLogout}
                      size={'lg'}
                      className='text-md flex w-full justify-start rounded-none! px-4 py-3! text-left font-normal text-black transition-all duration-200 ease-linear hover:bg-slate-100'
                    >
                      {logoutMutation.isPending ? (
                        <ButtonLoading />
                      ) : (
                        'Đăng xuất'
                      )}
                    </Button>
                  </ListItem>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
