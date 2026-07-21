import React from 'react';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassmorphismCard({ children, className = '' }: GlassmorphismCardProps) {
  return (
    <div className={`
      relative overflow-hidden
      bg-black/20 
      backdrop-blur-[12px] 
      border border-white/[0.08] 
      rounded-2xl 
      transition-all duration-300 ease-out
      hover:bg-black/30 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]
      ${className}
    `}>
      {children}
    </div>
  );
}