import { createElement, type HTMLAttributes, type ReactNode } from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'caption';
type TypographyColor = 'primary' | 'secondary' | 'accent';
type TypographyAlign = 'left' | 'center' | 'right';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
}

const variantTags = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body1: 'p',
  caption: 'span',
} as const;

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'font-display text-3xl md:text-4xl font-bold',
  h2: 'font-display text-xl md:text-2xl font-semibold',
  h3: 'text-base font-semibold',
  body1: 'text-base',
  caption: 'text-xs',
};

const colorClasses: Record<TypographyColor, string> = {
  primary: 'text-stellar-white',
  secondary: 'text-stellar-white/70',
  accent: 'text-electric-blue',
};

const alignClasses: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export function Typography({
  children,
  variant = 'body1',
  color = 'primary',
  align = 'left',
  className = '',
  ...rest
}: TypographyProps) {
  return createElement(
    variantTags[variant],
    {
      className: `${variantClasses[variant]} ${colorClasses[color]} ${alignClasses[align]} ${className}`,
      ...rest,
    },
    children
  );
}

export default Typography;
