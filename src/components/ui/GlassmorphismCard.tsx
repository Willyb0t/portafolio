import { ReactNode } from 'react';

export interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassmorphismCard({ children, className = '' }: GlassmorphismCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20 backdrop-blur-[12px] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-black/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] ${className}`}
    >
      {children}
    </div>
  );
}

export default GlassmorphismCard;
