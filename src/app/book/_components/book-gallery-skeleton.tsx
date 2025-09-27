import { Swiper, SwiperSlide } from 'swiper/react';

export default function BookGallerySkeleton() {
  return (
    <div className='w-full'>
      <div className='skeleton h-[500px] w-full'></div>

      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        watchSlidesProgress
        centeredSlides={false}
        slideToClickedSlide={true}
      >
        {Array.from({ length: 8 })
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index}>
              <div
                className={`skeleton relative mt-2 h-[80px] w-full cursor-pointer overflow-hidden rounded border-2 transition-all duration-200`}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
