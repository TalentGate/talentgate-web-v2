'use client';

import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { Provider } from 'react-redux';

import { Toaster } from '@/components/ui/sonner';
import { store } from '@/lib/store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {children}
        </Provider>
        <Toaster richColors={true}/>
      </body>
    </html>
  );
}
