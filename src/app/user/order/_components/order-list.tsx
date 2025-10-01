'use client';

import OrderItem from '@/app/user/order/_components/order-item';
import Link from 'next/link';

export default function OrderList() {
  return (
    <>
      {/* Order filter tabs */}
      <div className='mb-4 flex items-center justify-evenly rounded-lg bg-white py-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
        <Link href={'/#'} className='text-dark-cyan font-medium'>
          Tất cả
        </Link>
        <Link
          href={'/#'}
          className='hover:text-dark-cyan text-gray-500 transition-colors duration-200 ease-linear'
        >
          Đang xử lý
        </Link>
        <Link
          href={'/#'}
          className='hover:text-dark-cyan text-gray-500 transition-colors duration-200 ease-linear'
        >
          Hoàn tất giao hàng
        </Link>
        <Link
          href={'/#'}
          className='hover:text-dark-cyan text-gray-500 transition-colors duration-200 ease-linear'
        >
          Đã hủy
        </Link>
      </div>
      <div className='mt-5'>
        {Array.from({ length: 4 }).map((_, index) => (
          <OrderItem key={index} />
        ))}
      </div>
    </>
  );
}
