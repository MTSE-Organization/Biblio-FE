'use client';

import { product } from '@/assets';
import { Button } from '@/components/form';
import { List, ListItem } from '@/components/list';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex w-full flex-col rounded-md border px-6 py-4'>
        <h2 className='text-green-primary mb-3 text-2xl font-bold'>
          Địa chỉ nhận hàng
        </h2>
        <div className='flex items-center justify-between'>
          <div className='flex gap-10'>
            <span className='font-bold'>Le Van A | 0901234561</span>
            <p>121 Nguyễn Đình Chiểu, Phường 6, Quận 3, TP HCM</p>
          </div>
          <Button className='bg-green-primary'>Thay đổi</Button>
        </div>
      </div>
      <div className='rounded-md border'>
        <table className='w-full'>
          <thead className='bg-[#e4f2ed]'>
            <tr>
              <th className='p-4'>Sách</th>
              <th className='p-4'>Giá</th>
              <th className='p-4 text-center'>Số lượng</th>
              <th className='p-4'>Tổng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='w-2/5 px-3.5 py-5 font-semibold'>
                <Link href='#' className='flex items-center'>
                  <Image
                    src={product}
                    alt='Product'
                    width={60}
                    className='mr-5 rounded-md'
                  />
                  Trên đường băng
                </Link>
              </td>
              <td className='px-3.5 py-5 text-center'>
                <span className='text-green-primary font-bold'>100.000₫</span>
              </td>
              <td className='px-3.5 py-5 text-center'>
                <span>1</span>
              </td>
              <td className='px-3.5 py-5 text-center'>
                <span className='font-medium'>100.000đ</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='flex justify-between rounded-md border px-6 py-4'>
        <div className='flex items-center gap-2.5'>
          <svg
            stroke='currentColor'
            viewBox='0 -2 23 22'
            className='text-green-primary h-6 w-6'
          >
            <g filter='url(#voucher-filter0_d)'>
              <mask id='a' fill='#fff'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z'
                ></path>
              </mask>
              <path
                d='M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z'
                mask='url(#a)'
              ></path>
            </g>
            <path
              clip-rule='evenodd'
              d='M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z'
            ></path>
            <defs>
              <filter
                id='voucher-filter0_d'
                x='0'
                y='1'
                width='20'
                height='16'
                filterUnits='userSpaceOnUse'
                color-interpolation-filters='sRGB'
              >
                <feFlood
                  flood-opacity='0'
                  result='BackgroundImageFix'
                ></feFlood>
                <feColorMatrix
                  in='SourceAlpha'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                ></feColorMatrix>
                <feOffset></feOffset>
                <feGaussianBlur stdDeviation='.5'></feGaussianBlur>
                <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0'></feColorMatrix>
                <feBlend
                  in2='BackgroundImageFix'
                  result='effect1_dropShadow'
                ></feBlend>
                <feBlend
                  in='SourceGraphic'
                  in2='effect1_dropShadow'
                  result='shape'
                ></feBlend>
              </filter>
            </defs>
          </svg>
          <p>Biblio Voucher</p>
        </div>
        <div className='flex gap-10'>
          <div>
            <input
              placeholder='Nhập mã freeship'
              className='mr-2.5 rounded-md border px-2 py-2 text-sm'
            />
            <Button className='bg-green-primary'>Áp dụng</Button>
          </div>
          <div>
            <input
              placeholder='Nhập mã giảm giá'
              className='mr-2.5 rounded-md border px-2 py-2 text-sm'
            />
            <Button className='bg-green-primary'>Áp dụng</Button>
          </div>
        </div>
      </div>
      <div className='rounded-md border px-6 py-4'>
        <p className='text-green-primary text-xl font-semibold'>
          Phương thức thanh toán
        </p>
        <div className='mt-5 mb-5 flex h-10 items-center justify-evenly'>
          <div className='payment-method h-full cursor-pointer rounded border border-transparent bg-white px-4 py-2 transition-all duration-300 hover:bg-gray-50'>
            <img
              src='https://res.cloudinary.com/taskmanagereaglob123/image/upload/v1641970995/VietQR.46a78cbb_utwzzh.png'
              alt='VietQR'
              width={80}
              height={40}
              className='h-full w-full scale-[1.2] object-cover'
            />
          </div>

          <div className='payment-method h-full cursor-pointer rounded bg-[#a50164] px-4 py-2 transition-all duration-300 hover:bg-[#a50164]'>
            <img
              src='https://static.ybox.vn/2022/4/4/1650508432111-tut.png'
              alt='MoMo'
              width={80}
              height={40}
              className='h-full w-full scale-[1.5] object-cover'
            />
          </div>

          <div className='payment-method h-full cursor-pointer rounded bg-white px-4 py-2 transition-all duration-300'>
            <img
              src='https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png'
              alt='VNPAY'
              width={80}
              height={40}
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-row-reverse'>
        <div className='w-1/3 rounded-md border px-6 py-4'>
          <p className='text-green-primary text-xl font-semibold'>
            Tóm tắt đơn hàng
          </p>
          <List className='mt-[15px]'>
            <ListItem className='flex justify-between py-[5px] text-[#777]'>
              <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
                Tổng tiền hàng
                <span>:</span>
              </label>
              100.000đ
            </ListItem>
            <ListItem className='flex justify-between py-[5px] text-[#777]'>
              <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
                Phí vận chuyển
                <span>:</span>
              </label>
              100.000đ
            </ListItem>
            <ListItem className='flex justify-between py-[5px] text-[#777]'>
              <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
                Giảm phí vận chuyển
                <span>:</span>
              </label>
              100.000đ
            </ListItem>
            <ListItem className='flex justify-between py-[5px] text-[#777]'>
              <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
                Giảm giá hàng
                <span>:</span>
              </label>
              100.000đ
            </ListItem>
            <ListItem>
              <hr className='my-2 border-t border-gray-300' />
            </ListItem>
            <ListItem className='text-green-primary flex items-center justify-between py-[5px] text-2xl font-semibold'>
              <label className='mr-2.5 flex min-w-44 justify-between font-medium text-[#2b2b2d]'>
                Tổng thanh toán
                <span>:</span>
              </label>
              100.000đ
            </ListItem>
          </List>
          <Button className='bg-green-primary mt-3 mb-2.5 w-full'>
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
}
