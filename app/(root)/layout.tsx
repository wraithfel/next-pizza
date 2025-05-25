import type { Metadata } from 'next';
import type { Viewport } from 'next'
import { Header } from '@/components/shared'

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main className="min-h-screen">
          <Header/>
          {children}
        </main>
  );
}
