import { ReactNode } from 'react';
import '@/app/globals.css';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)]">{children}</div>
    </>
  );
}