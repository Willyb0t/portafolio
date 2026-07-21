import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import CosmicBackground from '@/components/background/CosmicBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MotionProvider from '@/components/ui/MotionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-orbitron', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Willyb0t — Portafolio',
  description: 'Portafolio de Willyb0t — Entusiasta de la física y desarrollador full-stack.',
};

export const viewport: Viewport = {
  themeColor: '#000816',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-space-black font-sans text-stellar-white antialiased">
        <MotionProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded-lg focus:bg-electric-blue focus:px-4 focus:py-2 focus:text-space-black"
          >
            Saltar al contenido
          </a>
          <CosmicBackground />
          <Navbar />
          <main id="contenido">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
