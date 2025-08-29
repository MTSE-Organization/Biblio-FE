'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { banner1, banner2 } from '@/assets';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      speed={2000}
      loop
      className='w-full flex-1'
    >
      <SwiperSlide>
        <div className='h-ful flex items-center justify-center'>
          <Image src={banner1} alt='Banner 1' fill className='object-cover' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='h-ful flex items-center justify-center'>
          <Image src={banner2} alt='Banner 2' fill className='object-cover' />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
