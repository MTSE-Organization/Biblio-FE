import { Footer } from '@/components/app/footer';
import { Header } from '@/components/app/header';
import { Container } from '@/components/layout';

export default function BookLayout({
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
          { label: 'Chi tiết sách' }
        ]}
        separator='/'
      /> */}
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
