import type { Viewport } from 'next'
import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast'; 
import './globals.css';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
        <Toaster                                      
          position="top-center"
          toastOptions={{ duration: 2500 }}
        />
      </body>
    </html>
  );
}
