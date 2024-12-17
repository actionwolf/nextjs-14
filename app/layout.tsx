import '@/css/globals.css';

import { Viewport, Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navigation from '@/components/navigation';

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'auto',
  colorScheme: 'dark'
};

export const metadata: Metadata = {
  title: {
    template: '%s | Next@14',
    default: 'Next@14'
  },
  description: 'Generated by Next.js'
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} min-w-min`}>
        <main className='flex flex-col md:flex-row h-screen'>
          <Navigation />

          <section className='w-full p-5'>{children}</section>
        </main>
      </body>
    </html>
  );
}
