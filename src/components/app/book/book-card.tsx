import { product } from '@/assets';
import route from '@/routes';
import { ProductResType } from '@/types';
import { formatPrice } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { RiShoppingBagLine, RiStarFill } from 'react-icons/ri';

export default function BookCard({ book }: { book: ProductResType }) {
  return (
    <div className='h-full rounded-md border bg-white p-3'>
      <div className='relative flex h-auto items-center justify-center rounded-md'>
        <Link href={`${route.book}/${book.slug}.${book.id}`}>
          <Image src={product} alt='Product' />
        </Link>
        <div className='text-green-primary hover:bg-green-primary absolute bottom-[-16px] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-gray-100 hover:text-white'>
          <RiShoppingBagLine />
        </div>
      </div>
      <div className='flex flex-col items-center pt-5 text-center'>
        <div className='mb-3 flex flex-col items-center'>
          <p className='mb-2 line-clamp-1 text-sm text-gray-500'>
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
          className='hover:text-green-primary mb-3 line-clamp-1 leading-6 font-medium break-all'
        >
          {book.name}
        </Link>
        <p className='text-green-primary font-bold'>
          {formatPrice(book.price)}đ
        </p>
      </div>
    </div>
  );
}
