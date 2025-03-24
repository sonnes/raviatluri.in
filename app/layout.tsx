import type { Metadata } from 'next';
import { Noto_Sans, Noto_Sans_Mono } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

import Footer from '@/components/footer';
import Header from '@/components/header';

import './globals.css';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

const notoMono = Noto_Sans_Mono({
  variable: '--font-noto-sans-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Ravi Atluri',
    template: '%s | Ravi Atluri',
  },
  description:
    'Product Engineer at GoFood in Gojek. Working scalable and reliable systems & abstractions for product engineering teams.',
  openGraph: {
    title: 'Ravi Atluri',
    description:
      'Product Engineer at GoFood in Gojek. Working scalable and reliable systems & abstractions for product engineering teams.',
    url: 'https://raviatluri.in',
    siteName: 'Ravi Atluri',
    images: [
      {
        url: 'https://raviatluri.in/og.png',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Ravi Atluri',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <head />
      <body
        className={clsx(
          'flex h-full min-h-screen flex-col bg-white',
          notoSans.variable,
          notoMono.variable,
          'antialiased'
        )}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
