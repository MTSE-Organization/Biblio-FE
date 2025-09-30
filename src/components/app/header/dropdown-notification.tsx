'use client';

import { Button } from '@/components/form';
import { FaChevronDown } from 'react-icons/fa';
import { RiNotification3Line } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { emptyNotification } from '@/assets';
import route from '@/routes';
import { List, ListItem } from '@/components/list';

export default function DropdownNotification() {
  const [open, setOpen] = useState<boolean>(false);

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
            0
          </div>
        </div>
        Thông báo
        <FaChevronDown
          className={`transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            style={{ transformOrigin: '420px -15px' }}
            className='absolute -right-4 mt-2 w-125 before:absolute before:-top-4 before:h-4 before:w-full before:cursor-pointer before:bg-transparent before:content-[""]'
          >
            <div className='absolute -top-2 right-16 h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-white group-hover:border-b-green-100' />

            <List className='h-[30vh] max-h-[30vh] min-h-75 overflow-hidden rounded border border-white bg-white py-5 shadow-[0px_-3px_24px_rgba(149,157,165,0.5)] transition-all duration-200 ease-linear group-hover:border-green-100 group-hover:bg-green-50'>
              <ListItem className='flex h-full w-full flex-col items-center justify-start'>
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
              {/* <ListItem>
                <Link
                  className='block px-4 py-1.5 transition-all duration-200 ease-linear hover:bg-slate-100'
                  href='/notifications'
                >
                  Bạn chưa có thông báo nào
                </Link>
              </ListItem> */}
            </List>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
