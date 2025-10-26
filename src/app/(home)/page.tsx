'use client';

import { Container } from '@/components/layout';
import {
  useBestSellerProductListQuery,
  useLatestProductListQuery,
  useTopDiscountProductListQuery,
  useTopViewProductListQuery
} from '@/queries';
import { LazyBookList } from '@/components/app/book';
import { HeroSlider } from '@/app/(home)/_components/hero-slider';
import { CategoryList } from '@/app/(home)/_components/category';

export default function HomePage() {
  return (
    <>
      <div className=''>
        {/* <Breadcrumb
          items={[{ label: 'Trang chủ', href: route.home }]}
          separator='/'
        /> */}
        <HeroSlider />
      </div>
      <Container>
        <CategoryList />
        <LazyBookList
          title='Sách mới nhất'
          className='mb-5'
          useQueryHook={useLatestProductListQuery}
        />
        <LazyBookList
          title='Sách bán chạy nhất'
          className='mb-5'
          useQueryHook={useBestSellerProductListQuery}
        />
        <LazyBookList
          title='Sách có lượt xem nhiều nhất'
          className='mb-5'
          useQueryHook={useTopViewProductListQuery}
        />
        <LazyBookList
          title='Sách khuyến mãi cao nhất'
          useQueryHook={useTopDiscountProductListQuery}
        />
      </Container>
    </>
  );
}
