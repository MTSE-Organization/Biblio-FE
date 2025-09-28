import { UserSidebar } from '@/app/user/_components';
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
      <Container>
        <UserSidebar />
        {children}
      </Container>
    </>
  );
}
