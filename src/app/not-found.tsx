import { notFound } from '@/assets';
import { Footer } from '@/components/app/footer';
import { Header } from '@/components/app/header';
import { Container } from '@/components/layout';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Container contentClassName='mx-auto flex flex-col items-center min-h-[80vh] justify-center bg-white'>
        <Image
          src={notFound.src}
          width={400}
          height={100}
          alt='Không tìm thấy trang'
        />
        <span className='mt-4 text-base font-medium'>Không tìm thấy trang</span>
      </Container>
      <Footer />
    </>
  );
}
