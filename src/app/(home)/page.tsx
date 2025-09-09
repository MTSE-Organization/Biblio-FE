'use client';

import { Breadcrumb } from '@/components/form';
import route from '@/routes';
import HeroSlider from './_components/hero-slider';
import { Container } from '@/components/layout';
import {
  useBestSellerProductListQuery,
  useLatestProductListQuery,
  useTopDiscountProductListQuery
} from '@/queries';
import { BookList } from '@/components/app/book';

export default function HomePage() {
  return (
    <>
      <div className='flex h-[calc(100vh-85px)] flex-col'>
        <Breadcrumb
          items={[{ label: 'Trang chủ', href: route.home }]}
          separator='/'
        />
        <HeroSlider />
      </div>
      <Container className='mx-auto mb-12 max-w-[1320px]'>
        <BookList
          title='Sách mới nhất'
          useQueryHook={useLatestProductListQuery}
        />
        <BookList
          title='Sách bán chạy nhất'
          useQueryHook={useBestSellerProductListQuery}
        />
        {/* <BookList
          title='Sách được xem nhiều nhất'
          books={Array(8).fill(null)}
        /> */}
        <BookList
          title='Sách khuyến mãi cao nhất'
          useQueryHook={useTopDiscountProductListQuery}
        />
      </Container>
    </>
  );
}
