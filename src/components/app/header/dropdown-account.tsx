'use client';

import { Button } from '@/components/form';
import { FaChevronDown } from 'react-icons/fa';
import { RiUser3Line } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import ListItem from '@/components/list/ListItem';
import Link from 'next/link';
import { useState } from 'react';
import route from '@/routes';

export default function DropdownAccount() {
  const [open, setOpen] = useState(false);

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
            style={{ transformOrigin: '108px -15px' }}
            className='group absolute -left-8 mt-2 w-40 before:absolute before:-top-4 before:h-4 before:w-full before:cursor-pointer before:bg-transparent before:content-[""]'
          >
            <div className='absolute -top-2 left-2/3 h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-white' />

            <ul className='overflow-hidden rounded bg-white shadow-[0px_-3px_24px_rgba(149,157,165,0.5)]'>
              <ListItem>
                <Link
                  className='block px-4 py-1.5 transition-all duration-200 ease-linear hover:bg-slate-100'
                  href={route.login}
                >
                  Đăng nhập
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  className='block px-4 py-1.5 transition-all duration-200 ease-linear hover:bg-slate-100'
                  href={route.register}
                >
                  Đăng ký
                </Link>
              </ListItem>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
