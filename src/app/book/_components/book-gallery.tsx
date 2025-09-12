'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import { product, banner1, banner2 } from '@/assets';
import './swiper.css';

export default function BookGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const images = [product, banner1, banner2, product, product];

  return (
    <div className='w-full'>
      <Swiper
        modules={[Navigation, Thumbs, Autoplay]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        loop={true}
        grabCursor={true}
        className='mb-8 w-full'
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className='relative h-[440px] w-full'>
              <Image
                src={img}
                alt={`Cover ${index}`}
                fill
                className='rounded-xl object-cover'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={10}
        watchSlidesProgress
        centeredSlides={true}
        slideToClickedSlide={true}
        className='w-full'
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className='relative h-[80px] w-full cursor-pointer'>
              <Image
                src={img}
                alt={`Thumbnail ${index}`}
                fill
                className='rounded object-cover'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
