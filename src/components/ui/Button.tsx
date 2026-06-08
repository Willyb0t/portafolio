import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  asChild?: boolean;
  href?: string;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  asChild = false,
  href,
  onClick,
}) => {
  const Component = asChild || href ? 'a' : 'button';

  const baseClasses = 'font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variantClasses = {
    primary: 'bg-electric-blue text-white hover:bg-blue-600 focus-visible:ring-blue-500',
    secondary: 'bg-vibrant-purple text-white hover:bg-purple-600 focus-visible:ring-purple-500',
    outline: 'border border-electric-blue text-electric-blue hover:bg-electric-blue/10 focus-visible:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};