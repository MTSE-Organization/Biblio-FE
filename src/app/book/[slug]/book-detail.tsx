'use client';

import { product } from '@/assets';
import { Button, Col, Row } from '@/components/form';
import List from '@/components/list';
import ListItem from '@/components/list/ListItem';
import Image from 'next/image';
import { RiStarFill } from 'react-icons/ri';
import BookTabs from '../_components/book-tabs';
import { useParams } from 'next/navigation';
import { useProductQuery } from '@/queries';
import { formatDate, formatPrice } from '@/utils';
import BookGallery from '../_components/book-gallery';

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const id = slug.split('.')[1];
  const bookQuery = useProductQuery(id);
  const book = bookQuery.data?.data;
  return (
    <>
      <Row className='my-0'>
        <Col className='mb-24 w-full min-[768px]:w-1/2 min-[1200px]:w-10/24 min-[1400px]:w-1/3'>
          <BookGallery />
        </Col>
        <Col className='mb-24 w-full min-[768px]:w-1/2 min-[1200px]:w-12/24 min-[1400px]:w-2/3'>
          <div className='border-b border-solid border-b-gray-200 pb-5'>
            <h2 className='mb-[15px] block text-2xl leading-[1.5] font-semibold text-slate-800'>
              {book?.name}
            </h2>
          </div>
          <div className='mt-5 flex items-center'>
            <div className='mr-2.5 flex items-center gap-1'>
              <RiStarFill className='text-[#f5885f]' />
              <RiStarFill className='text-[#f5885f]' />
              <RiStarFill className='text-[#f5885f]' />
              <RiStarFill className='text-[#f5885f]' />
              <RiStarFill className='text-[#f5885f]' />
            </div>
            <p>( 2 Reviews)</p>
          </div>
          <List className='mt-[15px]'>
            <ListItem className='flex py-[5px] text-[#777]'>
              <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                Tác giả
                <span>:</span>
              </label>
              Tên tác giả
            </ListItem>
            <ListItem className='flex py-[5px] text-[#777]'>
              <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                NXB
                <span>:</span>
              </label>
              Tên NXB
            </ListItem>
            <ListItem className='flex py-[5px] text-[#777]'>
              <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                Ngày XB
                <span>:</span>
              </label>
              {formatDate(book?.releaseDate ?? '')}
            </ListItem>
            <ListItem className='flex py-[5px] text-[#777]'>
              <label className='mr-2.5 flex min-w-25 justify-between font-bold text-[#2b2b2d]'>
                Ngôn ngữ
                <span>:</span>
              </label>
              Tiếng Việt
            </ListItem>
          </List>
          <div className='pt-5'>
            <span className='text-green-primary text-2xl leading-[1.167] font-bold'>
              {formatPrice(book?.price ?? 0)} ₫
            </span>
          </div>
          <div className='flex items-center pt-5'>
            <h5 className='mb-0 leading-[1.556] text-[#2b2b2d]'>
              Tình trạng <span>:</span>
            </h5>
            <div className='pl-2.5'>
              <List className='flex w-full flex-wrap'>
                <ListItem className='bg-green-primary m-0.5 rounded-[5px] border border-solid border-[#e9e9e9] px-2.5 py-[5px] text-sm leading-none text-white'>
                  Mới
                </ListItem>
              </List>
            </div>
          </div>
          <div className='flex pt-5'>
            <div className='relative flex h-full'>
              <input
                type='text'
                defaultValue={1}
                minLength={1}
                maxLength={20}
                className='mr-[5px] h-10 w-10 rounded-[5px] border border-solid border-[#e9e9e9] text-center'
              />
              <div className='flex flex-col justify-between'>
                <button className='flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-[5px] border border-solid border-[#e9e9e9] bg-white p-0 pb-[2.5px] leading-0'>
                  +
                </button>
                <button className='flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-[5px] border border-solid border-[#e9e9e9] bg-white p-0 pb-[2.5px] leading-0'>
                  -
                </button>
              </div>
            </div>
            <div className='ml-[15px]'>
              <Button
                className='text-green-primary border-green-primary hover:bg-green-primary flex items-center justify-center rounded-[5px] border border-solid bg-white px-[22px] py-2 leading-[1.2] font-bold capitalize hover:text-white'
                variant={'outline'}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
            <div className='ml-[15px]'>
              <Button className='text-green-primary border-green-primary bg-green-primary hover:bg-green-primary/80 flex items-center justify-center rounded-[5px] border border-solid px-[22px] py-2 leading-[1.2] font-bold text-white capitalize'>
                Mua ngay
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <BookTabs />
    </>
  );
}
