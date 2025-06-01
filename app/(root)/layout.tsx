import type { Metadata } from 'next';
import type { Viewport } from 'next'
import { Header } from '@/shared/components/shared'
import InitAuth from '@/shared/components/shared/init-auth';
import { Suspense } from 'react';


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Next Pizza',
  description: 'Технологичный магазин пиццы',
};

export default function HomeLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
        <main className="min-h-screen">
          <Suspense>
            <Header/>
          </Suspense>
          <InitAuth />
          {children}
          {modal}
        </main>
  );
}
