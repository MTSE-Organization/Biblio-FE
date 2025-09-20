import './globals.css';
import { Be_Vietnam_Pro } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ToastPortal from '@/components/toast-portal';
import { AppProvider, QueryProvider } from '@/components/providers';
import BodyLoad from '@/components/app/body-load';

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
        <QueryProvider>
          <AppProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='light'
              disableTransitionOnChange
            >
              {/* <WebVitals /> */}
              <NextTopLoader color='#64b496' showSpinner={false} />
              <Suspense>{children}</Suspense>
            </ThemeProvider>
            <ToastPortal />
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
