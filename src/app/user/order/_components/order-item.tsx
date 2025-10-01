import { product } from '@/assets';
import { Button } from '@/components/form';
import { formatPrice } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderItem() {
  return (
    <div className='relative mb-5 rounded rounded-lg border border-gray-200 bg-white p-4 shadow-[0px_0px_10px_2px] shadow-gray-200'>
      <div className='mb-3 flex justify-between border-b border-solid border-gray-200 pb-5 font-medium text-emerald-600'>
        <div className='text-sm text-gray-600'>11:11, 11/11/2025</div>
        <Link href='/#'>Hoàn thành</Link>
      </div>
      <div className='mb-3 flex items-center border-b border-solid border-gray-200'>
        <div className='mb-4 flex w-full items-center'>
          <div className='flex-shrink-0'>
            <Image
              src={product.src}
              width={100}
              height={100}
              alt='Sản phẩm'
              className='rounded-lg object-contain'
            />
          </div>
          <div className='ml-4 flex w-full flex-grow-1 items-center justify-between pl-4'>
            <div>
              <h4 className='mb-5'>Tên sách</h4>
              <p className='text-zinc-800'>Tên NXB</p>
            </div>
            <div className='text-right'>
              <p className='text-zinc-800'>{formatPrice(120000)} ₫</p>
              <p className='text-zinc-800'>x1</p>
            </div>
          </div>
        </div>
      </div>
      <div className='text-right'>
        <div className='font-semibold'>Thành tiền: {formatPrice(120000)} ₫</div>
      </div>
      <div className='mt-5 flex justify-end gap-2 text-right'>
        <Button variant={'primary'} className='rounded px-4 py-2 text-white'>
          Đã nhận được hàng
        </Button>
        <Button
          variant={'outline'}
          className='rounded border border-gray-200 px-4 py-2 text-black hover:bg-gray-100'
        >
          Liên hệ người bán
        </Button>
      </div>
    </div>
  );
}
