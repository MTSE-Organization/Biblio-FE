'use client';

import OrderItem from '@/app/user/order/_components/order-item';
import { product } from '@/assets';
import { Button } from '@/components/form';
import { Container } from '@/components/layout';
import { formatPrice } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderList() {
  return (
    <Container className='bg-gray-100 py-5'>
      {/* Order filter tabs */}
      <div className='mx-auto max-w-5xl'>
        <div className='mb-5 flex items-center justify-evenly border border-gray-200 bg-white py-3'>
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
          {Array.from({ length: 8 }).map((_, index) => (
            <OrderItem key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}
