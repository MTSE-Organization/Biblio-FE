'use client';
import { defaultBook } from '@/assets';
import { StarRating } from '@/components/star-rating';
import { useImageZoom } from '@/hooks';
import { useViewedProductMutation } from '@/queries';
import route from '@/routes';
import { ProductAutoType } from '@/types';
import { formatPrice, renderImageUrl } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function BookCard({ book }: { book: ProductAutoType }) {
  const viewedProductMutation = useViewedProductMutation();
  const { handleMouseMove, handleMouseOut, handleMouseOver } = useImageZoom();
  const handleClick = async () => {
    await viewedProductMutation.mutateAsync({ productId: book.id });
  };
  return (
    <div className='min-h-115 rounded-md bg-white p-3 transition-all duration-100 ease-linear hover:shadow-[0px_0px_10px_2px] hover:shadow-gray-200'>
      <div className='relative flex h-auto items-center justify-center'>
        <div className='h-70 w-full'>
          <Link
            href={`${route.book}/${book.slug}.${book.id}`}
            className='block'
            onClick={handleClick}
          >
            <div className='relative aspect-[3/4] w-full overflow-hidden'>
              <Image
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onMouseMove={handleMouseMove}
                src={renderImageUrl(book.image?.url) || defaultBook.src}
                fill
                className='object-cover transition-all duration-200 ease-linear'
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
          <Link
            href={`${route.category}/${book.category.slug}.${book.category.id}`}
            title={book.category.name}
            className='hover:text-green-primary mb-2 line-clamp-1 text-sm text-gray-500 transition-all duration-200 ease-linear'
          >
            {book.category.name}
          </Link>
          <div className='flex items-center justify-center'>
            <StarRating value={20} />
          </div>
        </div>
        <Link
          href={`${route.book}/${book.slug}.${book.id}`}
          className='hover:text-green-primary mb-3 line-clamp-1 leading-6 font-medium break-all transition-all duration-200 ease-linear'
          title={book.name}
          onClick={handleClick}
        >
          {book.name}
        </Link>
        {book.discount === 0 && (
          <p className='text-green-primary text-base font-bold'>
            {formatPrice(book.price)}
          </p>
        )}
        {book.discount !== 0 && (
          <div className='flex items-center gap-2'>
            <div>
              <p className='text-green-primary text-base font-bold'>
                {formatPrice((book.price * (100 - book.discount)) / 100)}
              </p>
              <p className='font-bold text-gray-400 line-through'>
                {formatPrice(book.price)}
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
