import { Header } from '@/components/app/header';
import { Container } from '@/components/layout';
import { Footer } from 'react-day-picker';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
