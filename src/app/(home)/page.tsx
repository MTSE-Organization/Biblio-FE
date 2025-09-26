'use client';
import HeroSlider from './_components/hero-slider/hero-slider';
import { Container } from '@/components/layout';
import {
  useLatestProductListQuery,
  useTopDiscountProductListQuery
} from '@/queries';
import { BookList } from '@/components/app/book';
import CategoryList from '@/app/(home)/_components/category/category-list';

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
      <Container className='bg-gray-100'>
        <div className='mx-auto max-w-[1320px] pt-12 pb-12'>
          <CategoryList />
          <BookList
            title='Sách mới nhất'
            useQueryHook={useLatestProductListQuery}
          />
          {/* <BookList
          title='Sách bán chạy nhất'
          useQueryHook={useBestSellerProductListQuery}
        /> */}
          {/* <BookList
          title='Sách được xem nhiều nhất'
          books={Array(8).fill(null)}
        /> */}
          <BookList
            title='Sách khuyến mãi cao nhất'
            useQueryHook={useTopDiscountProductListQuery}
          />
        </div>
      </Container>
    </>
  );
}
