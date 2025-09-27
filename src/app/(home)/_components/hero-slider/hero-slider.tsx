'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import './hero-slider.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { useFeaturedProductQuery } from '@/queries';
import { renderImageUrl } from '@/utils';

export default function HeroSlider() {
  const featuredProductQuery = useFeaturedProductQuery();
  const images =
    featuredProductQuery.data?.data?.content?.map((p) => p.images[0].url) || [];
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={30}
      grabCursor={true}
      autoplay={{ delay: 5000 }}
      pagination={{
        clickable: true
      }}
      speed={1500}
      className='w-full flex-1 shadow-[0px_0px_5px_10px] shadow-gray-50'
      loop={true}
    >
      {images.map((image, idx) => (
        <SwiperSlide key={image}>
          <div className='relative w-full pt-[40%]'>
            <Image
              unoptimized
              src={renderImageUrl(image)}
              alt={`Banner ${idx + 1}`}
              fill
              priority={idx === 0}
              loading={idx === 0 ? 'eager' : 'lazy'}
              sizes='(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw'
              className='absolute top-0 left-0 h-full w-full object-contain'
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
