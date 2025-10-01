import { Footer } from '@/components/app/footer';
import { Header } from '@/components/app/header';
import { Container } from '@/components/layout';

export default function ProductLayout({
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
      <Container>
        <div className='mx-auto pt-10 pb-10 min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px]'>
          {children}
        </div>
      </Container>
      <Footer />
    </>
  );
}
