'use client';

import { Breadcrumb } from '@/components/form';
import route from '@/routes';
import HeroSlider from './hero-slider';

export default function HomePage() {
  return (
    <div className='flex h-[calc(100vh-85px)] flex-col'>
      <Breadcrumb
        items={[{ label: 'Trang chủ', href: route.home }]}
        separator='/'
      />
      <HeroSlider />
    </div>
  );
}
