import { UserSidebar } from '@/app/user/_components';
import { Footer } from '@/components/app/footer';
import { Header } from '@/components/app/header';
import { Container } from '@/components/layout';

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Container contentClassName='mx-auto flex min-h-[80vh] justify-center gap-x-4'>
        <div className='h-fit w-50 rounded-lg bg-white'>
          <UserSidebar />
        </div>
        <div className='flex-1 rounded-lg'>{children}</div>
      </Container>
      <Footer />
    </>
  );
}
