'use client';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import Image from 'next/image';
import { renderImageUrl } from '@/utils';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './category.css';
import { useCategoryListQuery } from '@/queries';
import CategorySkeleton from '@/app/(home)/_components/category/category-skeleton';
import { Row } from '@/components/form';

export default function CategoryList() {
  const categoryListQuery = useCategoryListQuery({});
  const loading = categoryListQuery.isLoading || categoryListQuery.isFetching;
  const categories = categoryListQuery.data?.data.content || [];
  const swiper = useSwiper();

  return (
    <div className='mb-4 rounded-lg bg-white px-4 py-6 shadow-[0px_0px_10px_2px] shadow-gray-200'>
      <h2 className='mb-4 border-b-2 border-solid border-gray-200 pb-4 text-center text-4xl font-bold'>
        Danh mục
      </h2>

      <div className='category-list-container relative'>
        <Swiper
          slidesPerView={6}
          spaceBetween={8}
          grabCursor={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          modules={[Navigation]}
        >
          {!loading ? (
            categories.map((cate) => (
              <SwiperSlide
                key={cate.id}
                className='hover:text-green-primary transition-all! duration-200 ease-linear'
              >
                <div className='rounded-lg'>
                  <Image
                    src={renderImageUrl(cate.imageUrl)}
                    alt={cate.name}
                    width={200}
                    height={80}
                    className='w-full rounded-lg object-cover'
                  />
                </div>
                <p className='mt-4 text-center text-base font-medium'>
                  {cate.name}
                </p>
              </SwiperSlide>
            ))
          ) : (
            <Row>
              {Array.from({ length: 8 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </Row>
          )}
        </Swiper>
        <div
          className='swiper-button-next'
          onClick={() => swiper?.slideNext()}
        ></div>
        <div
          className='swiper-button-prev'
          onClick={() => swiper?.slidePrev()}
        ></div>
      </div>
    </div>
  );
}
