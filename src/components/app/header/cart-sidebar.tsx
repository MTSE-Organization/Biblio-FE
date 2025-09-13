'use client';

import { useState } from 'react';
import { Button } from '@/components/form';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { emptyCart, product } from '@/assets';
import Link from 'next/link';
import route from '@/routes';

export default function CartSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant='ghost'
        onClick={() => setOpen(true)}
        className='text-md hover:text-green-primary group size-full rounded-full p-0! hover:bg-transparent! focus:outline-none focus-visible:ring-0'
      >
        <div className='relative'>
          <RiShoppingCartLine className='size-[21px]' />
          <div className='group-hover:bg-green-primary absolute -top-1.5 left-2.5 flex items-center justify-center rounded-full bg-black p-1 py-0 text-xs text-white transition-all duration-200 ease-linear'>
            0
          </div>
        </div>
        Giỏ hàng
      </Button>

      {/* Overlay + Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className='fixed inset-0 z-40 bg-black'
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='fixed top-0 right-0 z-50 flex h-full w-85 flex-col bg-white shadow-lg'
            >
              <div className='flex items-center justify-between border-b p-4'>
                <h2 className='text-lg font-semibold'>Giỏ hàng</h2>
                <button
                  onClick={() => setOpen(false)}
                  className='p-2 hover:text-red-500'
                >
                  <FaTimes />
                </button>
              </div>

              {/* <div className='flex flex-1 flex-col items-center justify-center overflow-y-auto p-4'>
                <p className='text-gray-500'>
                  Vui lòng{' '}
                  <Link
                    className='text-green-primary transition-all duration-200 ease-linear hover:opacity-80'
                    href={route.login}
                  >
                    đăng nhập
                  </Link>{' '}
                  để xem giỏ hàng
                </p>
                <Image
                  src={emptyCart.src}
                  alt='Empty Card'
                  width={200}
                  height={200}
                />
              </div> */}

              <ul className='overflow-auto px-5 pt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                <li className='mb-5 flex border-b pb-5'>
                  <Link className='m-auto basis-6/24' href='#'>
                    <Image className='rounded-sm' src={product} alt='Product' />
                  </Link>
                  <div className='relative flex basis-18/24 flex-col pl-4'>
                    <Link
                      href='#'
                      className='text-[15px] leading-4.5 font-medium'
                    >
                      Product name
                    </Link>
                    <span className='text-green-primary mt-1 text-sm font-bold'>
                      100.000đ
                    </span>
                    <div className='mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        -
                      </button>
                      <input
                        type='text'
                        defaultValue={1}
                        minLength={1}
                        maxLength={20}
                        className='w-[30px] text-center'
                      />
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        +
                      </button>
                    </div>
                    <button className='absolute right-0 cursor-pointer hover:text-red-500'>
                      <FaTimes size={12} />
                    </button>
                  </div>
                </li>
                <li className='mb-5 flex border-b pb-5'>
                  <Link className='m-auto basis-6/24' href='#'>
                    <Image className='rounded-sm' src={product} alt='Product' />
                  </Link>
                  <div className='relative flex basis-18/24 flex-col pl-4'>
                    <Link
                      href='#'
                      className='text-[15px] leading-4.5 font-medium'
                    >
                      Product name
                    </Link>
                    <span className='text-green-primary mt-1 text-sm font-bold'>
                      100.000đ
                    </span>
                    <div className='mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        -
                      </button>
                      <input
                        type='text'
                        defaultValue={1}
                        minLength={1}
                        maxLength={20}
                        className='w-[30px] text-center'
                      />
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        +
                      </button>
                    </div>
                    <button className='absolute right-0 cursor-pointer hover:text-red-500'>
                      <FaTimes size={12} />
                    </button>
                  </div>
                </li>
                <li className='mb-5 flex border-b pb-5'>
                  <Link className='m-auto basis-6/24' href='#'>
                    <Image className='rounded-sm' src={product} alt='Product' />
                  </Link>
                  <div className='relative flex basis-18/24 flex-col pl-4'>
                    <Link
                      href='#'
                      className='text-[15px] leading-4.5 font-medium'
                    >
                      Product name
                    </Link>
                    <span className='text-green-primary mt-1 text-sm font-bold'>
                      100.000đ
                    </span>
                    <div className='mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        -
                      </button>
                      <input
                        type='text'
                        defaultValue={1}
                        minLength={1}
                        maxLength={20}
                        className='w-[30px] text-center'
                      />
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        +
                      </button>
                    </div>
                    <button className='absolute right-0 cursor-pointer hover:text-red-500'>
                      <FaTimes size={12} />
                    </button>
                  </div>
                </li>
                <li className='mb-5 flex border-b pb-5'>
                  <Link className='m-auto basis-6/24' href='#'>
                    <Image className='rounded-sm' src={product} alt='Product' />
                  </Link>
                  <div className='relative flex basis-18/24 flex-col pl-4'>
                    <Link
                      href='#'
                      className='text-[15px] leading-4.5 font-medium'
                    >
                      Product name
                    </Link>
                    <span className='text-green-primary mt-1 text-sm font-bold'>
                      100.000đ
                    </span>
                    <div className='mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        -
                      </button>
                      <input
                        type='text'
                        defaultValue={1}
                        minLength={1}
                        maxLength={20}
                        className='w-[30px] text-center'
                      />
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        +
                      </button>
                    </div>
                    <button className='absolute right-0 cursor-pointer hover:text-red-500'>
                      <FaTimes size={12} />
                    </button>
                  </div>
                </li>
                <li className='mb-5 flex border-b pb-5'>
                  <Link className='m-auto basis-6/24' href='#'>
                    <Image className='rounded-sm' src={product} alt='Product' />
                  </Link>
                  <div className='relative flex basis-18/24 flex-col pl-4'>
                    <Link
                      href='#'
                      className='text-[15px] leading-4.5 font-medium'
                    >
                      Product name
                    </Link>
                    <span className='text-green-primary mt-1 text-sm font-bold'>
                      100.000đ
                    </span>
                    <div className='mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        -
                      </button>
                      <input
                        type='text'
                        defaultValue={1}
                        minLength={1}
                        maxLength={20}
                        className='w-[30px] text-center'
                      />
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        +
                      </button>
                    </div>
                    <button className='absolute right-0 cursor-pointer hover:text-red-500'>
                      <FaTimes size={12} />
                    </button>
                  </div>
                </li>
                <li className='mb-5 flex border-b pb-5'>
                  <Link className='m-auto basis-6/24' href='#'>
                    <Image className='rounded-sm' src={product} alt='Product' />
                  </Link>
                  <div className='relative flex basis-18/24 flex-col pl-4'>
                    <Link
                      href='#'
                      className='text-[15px] leading-4.5 font-medium'
                    >
                      Product name
                    </Link>
                    <span className='text-green-primary mt-1 text-sm font-bold'>
                      100.000đ
                    </span>
                    <div className='mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        -
                      </button>
                      <input
                        type='text'
                        defaultValue={1}
                        minLength={1}
                        maxLength={20}
                        className='w-[30px] text-center'
                      />
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        +
                      </button>
                    </div>
                    <button className='absolute right-0 cursor-pointer hover:text-red-500'>
                      <FaTimes size={12} />
                    </button>
                  </div>
                </li>
                <li className='mb-5 flex border-b pb-5'>
                  <Link className='m-auto basis-6/24' href='#'>
                    <Image className='rounded-sm' src={product} alt='Product' />
                  </Link>
                  <div className='relative flex basis-18/24 flex-col pl-4'>
                    <Link
                      href='#'
                      className='text-[15px] leading-4.5 font-medium'
                    >
                      Product name
                    </Link>
                    <span className='text-green-primary mt-1 text-sm font-bold'>
                      100.000đ
                    </span>
                    <div className='mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        -
                      </button>
                      <input
                        type='text'
                        defaultValue={1}
                        minLength={1}
                        maxLength={20}
                        className='w-[30px] text-center'
                      />
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        +
                      </button>
                    </div>
                    <button className='absolute right-0 cursor-pointer hover:text-red-500'>
                      <FaTimes size={12} />
                    </button>
                  </div>
                </li>
                <li className='mb-5 flex border-b pb-5'>
                  <Link className='m-auto basis-6/24' href='#'>
                    <Image className='rounded-sm' src={product} alt='Product' />
                  </Link>
                  <div className='relative flex basis-18/24 flex-col pl-4'>
                    <Link
                      href='#'
                      className='text-[15px] leading-4.5 font-medium'
                    >
                      Product name
                    </Link>
                    <span className='text-green-primary mt-1 text-sm font-bold'>
                      100.000đ
                    </span>
                    <div className='mt-[5px] flex h-[30px] w-[80px] items-center justify-between rounded-sm border'>
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        -
                      </button>
                      <input
                        type='text'
                        defaultValue={1}
                        minLength={1}
                        maxLength={20}
                        className='w-[30px] text-center'
                      />
                      <button className='flex w-[25px] cursor-pointer items-center justify-center'>
                        +
                      </button>
                    </div>
                    <button className='absolute right-0 cursor-pointer hover:text-red-500'>
                      <FaTimes size={12} />
                    </button>
                  </div>
                </li>
              </ul>

              <div className='border-t p-5'>
                <Button className='bg-green-primary w-full text-white'>
                  <Link href={route.cart}>Xem giỏ hàng</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
