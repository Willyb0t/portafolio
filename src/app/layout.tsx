import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Orbitron } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Willyb0t Portfolio',
  description: 'Portfolio of Willyb0t - Physics Enthusiast & Full-Stack Developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className={orbitron.className}>
        <MainLayout>{children}</MainLayout>
        <Footer />
      </body>
    </html>
  );
}