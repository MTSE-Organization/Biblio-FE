'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import './book-gallery.css';
import { ProductImageResType } from '@/types';
import Image from 'next/image';
import { renderImageUrl } from '@/utils';

export default function BookGallery({
  images
}: {
  images?: ProductImageResType[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiper = useSwiper();
  return (
    <div className='w-full rounded-lg shadow-[0px_0px_10px_2px] shadow-gray-100'>
      <div className='book-gallery-container'>
        <Swiper
          modules={[Navigation, Thumbs, Autoplay]}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          grabCursor={true}
          className='mb-8 w-full'
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <div className='relative h-[500px] w-full'>
                <Image
                  src={renderImageUrl(img.url)}
                  alt={`Cover ${index}`}
                  fill
                  className='rounded-xl object-contain'
                />
              </div>
            </SwiperSlide>
          ))}
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

      <Swiper
        modules={[Thumbs]}
        className='p-2!'
        onSwiper={setThumbsSwiper}
        slidesPerView={6}
        spaceBetween={10}
        watchSlidesProgress
        centeredSlides={false}
        slideToClickedSlide={true}
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className={`hover:border-green-primary relative h-[80px] w-full cursor-pointer overflow-hidden rounded border-[2.5px] transition-all duration-200 ${
                index === activeIndex
                  ? 'border-green-primary'
                  : 'border-transparent'
              }`}
            >
              <Image
                src={renderImageUrl(img.url)}
                alt={`Thumbnail ${index}`}
                fill
                className='rounded object-contain'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
