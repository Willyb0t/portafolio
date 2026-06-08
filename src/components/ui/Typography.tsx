import { FC, ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  align?: 'left' | 'center' | 'right';
}

export const Typography: FC<TypographyProps> = ({
  children,
  variant = 'body1',
  className = '',
  color = 'primary',
  align = 'left',
}) => {
  // Map variants to classes
  const variantClasses: Record<string, string> = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-semibold',
    h5: 'text-lg md:text-xl font-medium',
    h6: 'text-base md:text-lg font-medium',
    body1: 'text-base md:text-lg',
    body2: 'text-sm md:text-base',
    caption: 'text-xs',
  };

  // Map colors to classes
  const colorClasses: Record<string, string> = {
    primary: 'text-stellar-white',
    secondary: 'text-space-gray',
    accent: 'text-electric-blue',
    white: 'text-white',
  };

  // Map alignment to classes
  const alignClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${variantClasses[variant]} ${colorClasses[color]} ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};