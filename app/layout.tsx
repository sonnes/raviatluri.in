import { Analytics } from '@vercel/analytics/react';
import 'focus-visible';
import type { Metadata } from 'next';

import { Footer } from '@/components/footer';
import Header from '@/components/header';
import ClientThemeProvider from '@/providers/theme-provider';
import '@/styles/tailwind.css';

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full antialiased" lang="en">
      <head />
      <body className="flex h-full min-h-screen flex-col bg-white dark:bg-zinc-900">
        <ClientThemeProvider>
          <div className="relative">
            <Header />
            <main>{children}</main>
            <Analytics />
            <Footer />
          </div>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
