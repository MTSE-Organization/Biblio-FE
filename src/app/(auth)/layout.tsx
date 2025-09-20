import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import { Container } from '@/components/layout';
import React from 'react';

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
