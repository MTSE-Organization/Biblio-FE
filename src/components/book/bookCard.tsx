import { product } from '@/assets';
import route from '@/routes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RiShoppingBagLine, RiStarFill } from 'react-icons/ri';

const BookCard = () => {
  return (
    <div className='h-full rounded-md border bg-white p-3'>
      <div className='relative flex h-auto items-center justify-center rounded-md'>
        <Link href={`${route.book}/123`}>
          <Image src={product} alt='Product' />
        </Link>
        <div className='text-green-primary hover:bg-green-primary absolute bottom-[-16px] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-gray-100 hover:text-white'>
          <RiShoppingBagLine />
        </div>
      </div>
      <div className='flex flex-col items-center pt-5 text-center'>
        <div className='mb-3 flex flex-col items-center'>
          <p className='mb-2 text-sm text-gray-500'>Sách kỹ năng sống</p>
          <div className='flex items-center justify-center'>
            <RiStarFill className='text-yellow-500' />
            <RiStarFill className='text-yellow-500' />
            <RiStarFill className='text-yellow-500' />
            <RiStarFill className='text-yellow-500' />
            <RiStarFill className='text-yellow-500' />
            <p className='ml-1 text-xs text-gray-500'>(5)</p>
          </div>
        </div>
        <Link
          href={`${route.book}/123`}
          className='hover:text-green-primary mb-3 leading-6 font-medium'
        >
          Tuổi trẻ đáng giá bao nhiêu
        </Link>
        <p className='text-green-primary font-bold'>130.000đ</p>
      </div>
    </div>
  );
};

export default BookCard;
