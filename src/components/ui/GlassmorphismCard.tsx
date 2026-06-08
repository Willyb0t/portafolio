import { FC, ReactNode } from 'react';
import styles from './GlassmorphismCard.module.css';

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const GlassmorphismCard: FC<GlassmorphismCardProps> = ({
  children,
  className = '',
  title,
}) => {
  return (
    <div className={`${styles.glassmorphism-card} ${className}`}>
      {title && <h3 className={`${styles['card-title']}`}>{title}</h3>}
      <div className={`${styles['card-content']}`}>{children}</div>
    </div>
  );
};