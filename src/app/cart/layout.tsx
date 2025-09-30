import { Footer } from '@/components/app/footer';
import { Header } from '@/components/app/header';
import { Container } from '@/components/layout';

export default function CartLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* <Breadcrumb
        items={[
          { label: 'Trang chủ', href: route.home },
          { label: 'Giỏ hàng' }
        ]}
        separator='/'
      /> */}
      <Container className='mx-auto pt-3 min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px]'>
        {children}
      </Container>
      <Footer />
    </>
  );
}
