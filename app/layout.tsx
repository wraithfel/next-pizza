import type { Metadata } from 'next';
import type { Viewport } from 'next'
import { Nunito } from 'next/font/google';
import './globals.css';
import { Header } from '../components/shared'

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Next Pizza',
  description: 'Технологичный магазин пиццы',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <main className="min-h-screen">
          <Header/>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
