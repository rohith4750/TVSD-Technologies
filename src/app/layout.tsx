import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.scss';
import { AppProviders } from '@/providers/AppProviders';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'TVSD Enterprise Platform | Dynamic Layout & Theme Engine',
  description:
    'A scalable, configurable, enterprise-grade architecture built using Next.js, Material UI, Zustand, TanStack Query, TanStack Virtual, and SCSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
