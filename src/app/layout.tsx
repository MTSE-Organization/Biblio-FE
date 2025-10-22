import './globals.css';
import { Be_Vietnam_Pro } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import {
  AppProvider,
  QueryProvider,
  ThemeProvider
} from '@/components/providers';
import { BodyLoad } from '@/components/app/body-load';
import { ToastContainer } from 'react-toastify';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam-pro',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Biblio'
  },
  description: 'Trang chủ Biblio'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='vi'>
      <body
        className={`${beVietnamPro.variable} ${beVietnamPro.className} text-foreground antialiased transition-all duration-200 ease-linear`}
      >
        <BodyLoad />
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          disableTransitionOnChange
        >
          <QueryProvider>
            <AppProvider>
              {/* <WebVitals /> */}
              <NextTopLoader color='#64b496' showSpinner={false} />
              <Suspense>{children}</Suspense>
            </AppProvider>
          </QueryProvider>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
