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
      <Container className='bg-gray-100'>
        <div className='py-4'>
          <div className='mx-auto flex gap-x-4 rounded-lg min-[1200px]:w-180 min-[1440px]:w-300'>
            <div className='w-50 rounded-lg bg-white'>
              <UserSidebar />
            </div>
            <div className='w-250 rounded-lg bg-white'>{children}</div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
