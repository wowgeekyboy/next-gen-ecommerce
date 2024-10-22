import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextGen E-commerce Platform',
  description: 'Advanced e-commerce platform with real-time inventory updates and AI-powered recommendations',
  openGraph: {
    title: 'NextGen E-commerce Platform',
    description: 'Advanced e-commerce platform with real-time inventory updates and AI-powered recommendations',
    url: 'https://nextgen-ecommerce.com',
    siteName: 'NextGen E-commerce',
    images: [
      {
        url: 'https://nextgen-ecommerce.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextGen E-commerce Platform',
    description: 'Advanced e-commerce platform with real-time inventory updates and AI-powered recommendations',
    images: ['https://nextgen-ecommerce.com/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}