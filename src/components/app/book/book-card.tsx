'use client';

import { defaultBook } from '@/assets';
import { useImageZoom } from '@/hooks';
import route from '@/routes';
import { ProductResType } from '@/types';
import { formatPrice, renderImageUrl } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { RiStarFill } from 'react-icons/ri';

export default function BookCard({ book }: { book: ProductResType }) {
  const defaultImage = book?.images?.filter(
    (b) => b.isDefault || b.ordering === 0
  );
  const { handleMouseMove, handleMouseOut, handleMouseOver } = useImageZoom();
  return (
    <div className='min-h-115 rounded-md bg-white p-3 transition-all duration-100 ease-linear hover:shadow-[0px_0px_8px_2px] hover:shadow-gray-200'>
      <div className='relative flex h-auto items-center justify-center'>
        <div className='h-70 w-full'>
          <Link
            href={`${route.book}/${book.slug}.${book.id}`}
            className='block'
          >
            <div className='relative aspect-[3/4] w-full overflow-hidden'>
              <Image
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onMouseMove={handleMouseMove}
                src={renderImageUrl(defaultImage?.[0].url) || defaultBook.src}
                fill
                className='object-cover transition-all duration-50 ease-linear'
                alt='Product'
                sizes='(max-width: 768px) 50vw,
                      (max-width: 1200px) 25vw,
                      16vw'
                title={book.name}
                unoptimized
              />
            </div>
          </Link>
        </div>
      </div>
      <div className='flex flex-col items-center pt-5 text-center'>
        <div className='mb-3 flex flex-col items-center'>
          <p
            title={book.category.name}
            className='mb-2 line-clamp-1 text-sm text-gray-500'
          >
            {book.category.name}
          </p>
          <div className='flex items-center justify-center'>
            <RiStarFill className='text-yellow-500' />
            <RiStarFill className='text-yellow-500' />
            <RiStarFill className='text-yellow-500' />
            <RiStarFill className='text-yellow-500' />
            <RiStarFill className='text-yellow-500' />
            <p className='mt-0.5 ml-1 text-xs text-gray-500'>(5)</p>
          </div>
        </div>
        <Link
          href={`${route.book}/${book.slug}.${book.id}`}
          className='hover:text-green-primary mb-3 line-clamp-1 leading-6 font-medium break-all transition-all duration-200 ease-linear'
          title={book.name}
        >
          {book.name}
        </Link>
        {book.discount === 0 && (
          <p className='text-green-primary font-bold'>
            {formatPrice(book.price)} ₫
          </p>
        )}
        {book.discount !== 0 && (
          <div className='flex items-center gap-2'>
            <div>
              <p className='text-green-primary font-bold'>
                {formatPrice((book.price * (100 - book.discount)) / 100)} ₫
              </p>
              <p className='font-bold text-gray-400 line-through'>
                {formatPrice(book.price)} ₫
              </p>
            </div>
            <p className='bg-green-primary rounded p-1 text-xs text-white'>
              -{book.discount} %
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
