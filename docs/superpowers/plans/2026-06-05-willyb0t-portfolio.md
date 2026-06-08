# Willyb0t Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a multi-page, interactive portfolio website with space/observatory theme featuring interactive starfield with cursor interaction, reliable orbital systems, and modern UI components.

**Architecture:** Next.js 14 with App Router, TypeScript, Tailwind CSS, Framer Motion for animations. Component-based architecture with reusable UI components (StarfieldBackground, OrbitalSystem, GlassmorphismCard) and page-specific content. Focus on performance, accessibility, and responsive design.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, React Icons

---

### Task 1: Project Setup and Core Structure

**Files:**
- Create: `package.json` (if not exists)
- Create: `tsconfig.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `next.config.js`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx` (home page placeholder)
- Create: `src/components/layout/MainLayout.tsx`

- [ ] **Step 1: Initialize project with Next.js 14**

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-prefix "@/" --use-npm --yes
```

- [ ] **Step 2: Configure TypeScript strict mode**

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

- [ ] **Step 3: Configure Tailwind CSS with custom plugin for animations**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#000000',
        'space-blue': '#000816',
        'electric-blue': '#00b4d8',
        'vibrant-purple': '#0077b6',
        'cosmic-pink': '#ff006e',
        'stellar-white': '#f8f9fa',
        'space-gray': '#f0f0f0'
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' }
        },
        pulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    }
  },
  plugins: [],
}
```

- [ ] **Step 4: Create main layout component**

```tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Orbitron } from 'next/font/google';

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

      </body>
    </html>
  );
}
```

- [ ] **Step 5: Commit initial setup**

```bash
git add .
git commit -m "feat: initialize Next.js 14 project with TypeScript and Tailwind"
```

### Task 2: Create Navigation and Page Structure

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/app/page.tsx` (home page)
- Create: `src/app/about/page.tsx`
- Create: `src/app/portfolio/page.tsx`
- Create: `src/app/skills/page.tsx`
- Create: `src/app/experience/page.tsx`
- Create: `src/app/education/page.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create navigation component**

```tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const routes = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/skills', label: 'Skills' },
    { href: '/experience', label: 'Experience' },
    { href: '/education', label: 'Education' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <a href="/" className="text-xl font-bold">
          Willyb0t
        </a>
      </div>
      <div className="hidden md:flex space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`text-sm font-medium text-stellar-white/70 hover:text-stellar-white transition-colors ${
              pathname === route.href
                ? 'border-b-2 border-electric-blue'
                : 'border-b-2 border-transparent'
            }`}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <button className="text-xl" aria-label="Open menu">
          {/* Hamburger icon */}
        </button>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create home page with basic structure**

```tsx
import MainLayout from '@/components/layout/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mb-6">
          Willyb0t
        </h1>
        <p className="text-xl text-center max-w-2xl mb-8">
          Physics Enthusiast & Full-Stack Developer
        </p>
        <div className="space-y-6">
          <a href="/about" className="btn-primary">
            About Me
          </a>
          <a href="/portfolio" className="btn-secondary">
            View Projects
          </a>
        </div>
      </section>
    </MainLayout>
  );
}
```

- [ ] **Step 3: Create basic page templates for other routes**

```tsx
// Example for about page - similar structure for others
import MainLayout from '@/components/layout/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <h1 className="text-3xl md:text-4xl text-center mb-6">
          About Me
        </h1>
        <div className="max-w-4xl space-y-8">
          {/* Content will be added later */}
        </div>
      </section>
    </MainLayout>
  );
}
```

- [ ] **Step 4: Commit page structure**

```bash
git add .
git commit -m "feat: create navigation and page structure"
```

### Task 3: Implement StarfieldBackground Component

**Files:**
- Create: `src/components/background/StarfieldBackground.tsx`
- Create: `src/components/background/types.ts`
- Create: `src/components/background/StarfieldBackground.module.css`

- [ ] **Step 1: Create types for starfield configuration**

```typescript
export interface StarProps {
  x: number; // percentage
  y: number; // percentage
  size: number; // pixels
  brightness: number; // 0-1
  twinkleSpeed: number; // seconds
}

export interface StarfieldProps {
  starCount?: number;
  enableCursorInteraction?: boolean;
  enableComets?: boolean;
  className?: string;
}
```

- [ ] **Step 2: Create CSS module for starfield**

```css
.starfield {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  will-change: transform, opacity;
}

.comet {
  position: absolute;
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, transparent, white);
  pointer-events: none;
  z-index: -1;
}
```

- [ ] **Step 3: Implement starfield component with cursor interaction**

```tsx
import { useEffect, useRef, useState } from 'react';
import { StarProps, StarfieldProps } from './types';
import styles from './StarfieldBackground.module.css';

export default function StarfieldBackground({
  starCount = 80,
  enableCursorInteraction = true,
  enableComets = true,
  className = '',
}: StarfieldProps) {
  const starsRef = useRef<Array<{ element: HTMLDivElement; props: StarProps }>>([]);
  const cometsRef = useRef<Array<HTMLDivElement>>([]);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Initialize mouse position
    mousePosRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mousePosRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Create initial stars
    for (let i = 0; i < starCount; i++) {
      createStar();
    }

    // Animation loop
    const animate = () => {
      updateStars();
      if (enableComets) updateComets();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameRef.current);
      
      // Clean up elements
      starsRef.current.forEach(s => s.element.remove());
      cometsRef.current.forEach(c => c.remove());
    };
  }, [starCount, enableCursorInteraction, enableComets]);

  function createStar() {
    const star = document.createElement('div');
    star.className = styles.star;
    
    const props: StarProps = {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      brightness: 0.3 + Math.random() * 0.7,
      twinkleSpeed: 2 + Math.random() * 3,
    };
    
    // Apply initial styles
    star.style.left = `${props.x}%`;
    star.style.top = `${props.y}%`;
    star.style.width = `${props.size}px`;
    star.style.height = `${props.size}px`;
    star.style.opacity = `${props.brightness}`;
    star.style.animationDuration = `${props.twinkleSpeed}s`;
    
    document.body.appendChild(star);
    starsRef.current.push({ element: star, props });
    
    return star;
  }

  function updateStars() {
    if (!enableCursorInteraction) return;
    
    const { x: mouseX, y: mouseY } = mousePosRef.current;
    
    starsRef.current.forEach(({ element, props }) => {
      // Calculate distance from mouse
      const starX = (props.x / 100) * window.innerWidth;
      const starY = (props.y / 100) * window.innerHeight;
      const dx = starX - mouseX;
      const dy = starY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Interaction radius - closer = stronger effect
      const interactionRadius = 150;
      if (distance < interactionRadius) {
        // Calculate force based on distance
        const force = Math.max(0, (interactionRadius - distance) / interactionRadius);
        const angle = Math.atan2(dy, dx);
        
        // Apply subtle movement
        const moveX = Math.cos(angle) * force * 2;
        const moveY = Math.sin(angle) * force * 2;
        
        // Smoothly update position
        const currentX = parseFloat(element.style.left);
        const currentY = parseFloat(element.style.top);
        const newX = currentX + (moveX / window.innerWidth) * 100;
        const newY = currentY + (moveY / window.innerHeight) * 100;
        
        // Wrap around screen
        const wrappedX = ((newX % 100) + 100) % 100;
        const wrappedY = ((newY % 100) + 100) % 100;
        
        element.style.left = `${wrappedX}%`;
        element.style.top = `${wrappedY}%`;
        
        // Increase brightness near cursor
        const brightnessBoost = force * 0.3;
        const newBrightness = Math.min(1, props.brightness + brightnessBoost);
        element.style.opacity = `${newBrightness}`;
      } else {
        // Return to original position slowly
        const currentX = parseFloat(element.style.left);
        const currentY = parseFloat(element.style.top);
        const diffX = props.x - currentX;
        const diffY = props.y - currentY;
        
        element.style.left = `${currentX + diffX * 0.01}%`;
        element.style.top = `${currentY + diffY * 0.01}%`;
        
        // Return to original brightness
        const diffBrightness = props.brightness - parseFloat(element.style.opacity);
        element.style.opacity = `${parseFloat(element.style.opacity) + diffBrightness * 0.01}`;
      }
    });
  }

  function createComet() {
    const comet = document.createElement('div');
    comet.className = styles.comet;
    
    // Random entry point and direction
    const side = Math.floor(Math.random() * 4);
    let startX: number, startY: number;
    let velX: number, let velY: number;
    const speed = 2 + Math.random() * 3;
    
    switch (side) {
      case 0: // Top
        startX = Math.random() * 100;
        startY = -5;
        velX = (Math.random() - 0.5) * 0.5;
        velY = speed;
        break;
      case 1: // Right
        startX = 105;
        startY = Math.random() * 100;
        velX = -speed;
        velY = (Math.random() - 0.5) * 0.5;
        break;
      case 2: // Bottom
        startX = Math.random() * 100;
        startY = 105;
        velX = (Math.random() - 0.5) * 0.5;
        velY = -speed;
        break;
      case 3: // Left
        startX = -5;
        startY = Math.random() * 100;
        velX = speed;
        velY = (Math.random() - 0.5) * 0.5;
        break;
    }
    
    comet.style.left = `${startX}%`;
    comet.style.top = `${startY}%`;
    
    // Store velocity for movement
    comet.dataset.velX = String(velX);
    comet.dataset.velY = String(velY);
    comet.dataset.length = String(15 + Math.random() * 25); // 15-40px
    
    document.body.appendChild(comet);
    cometsRef.current.push(comet);
    
    return comet;
  }

  function updateComets() {
    cometsRef.current.forEach((comet, index) => {
      let x = parseFloat(comet.style.left);
      let y = parseFloat(comet.style.top);
      const velX = parseFloat(comet.dataset.velX || '0');
      const velY = parseFloat(comet.dataset.velY || '0');
      const length = parseFloat(comet.dataset.length || '20');
      
      x += velX;
      y += velY;
      
      comet.style.left = `${x}%`;
      comet.style.top = `${y}%`;
      
      // Remove if off screen
      if (x < -10 || x > 110 || y < -10 || y > 110) {
        comet.remove();
        cometsRef.current.splice(index, 1);
      } else {
        // Update comet height based on length
        comet.style.height = `${length}px`;
        
        // Calculate angle for gradient
        const angle = Math.atan2(velY, velX);
        // Gradient: transparent at tail, opaque at head
        comet.style.background = `linear-gradient(${angle}rad, transparent, white)`;
        comet.style.transform = `rotate(${angle * 180 / Math.PI}deg)`;
      }
    });
    
    // Occasionally add new comets
    if (Math.random() < 0.005) {
      createComet();
    }
  }
  
  return (
    <div className={`${styles.starfield} ${className}`} aria-hidden="true">
      {/* Stars and comets are added directly to body in useEffect */}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it compiles**

```bash
npm run dev
# Should start without errors
```

- [ ] **Step 5: Commit starfield component**

```bash
git add .
git commit -m "feat: implement StarfieldBackground component with cursor interaction and comets"
```

### Task 4: Implement OrbitalSystem Component

**Files:**
- Create: `src/components/orbital/OrbitalSystem.tsx`
- Create: `src/components/orbital/types.ts`
- Create: `src/components/orbital/OrbitalSystem.module.css`

- [ ] **Step 1: Create types for orbital system**

```typescript
export interface OrbitalProps {
  id?: string;
  centerX?: number; // percentage
  centerY?: number; // percentage
  radiusX?: number; // pixels
  radiusY?: number; // pixels
  speed?: number; // radians per frame
  planetColor?: string;
  planetSize?: number; // pixels
  trailLength?: number; // number of trail points
  className?: string;
}
```

- [ ] **Step 2: Create CSS module for orbital system**

```css
.orbital-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.orbital-path {
  position: absolute;
  border: 1px solid;
  border-radius: 50%;
}

.planet {
  position: absolute;
  width: var(--planet-size);
  height: var(--planet-size);
  border-radius: 50%;
  background-color: var(--planet-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.trail-point {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: var(--planet-color);
  opacity: 0.3;
}
```

- [ ] **Step 3: Implement orbital system component**

```tsx
import { useEffect, useRef } from 'react';
import { OrbitalProps } from './types';
import styles from './OrbitalSystem.module.css';

export default function OrbitalSystem({
  id,
  centerX = 50,
  centerY = 50,
  radiusX = 100,
  radiusY = 60,
  speed = 0.05,
  planetColor = '#4a90e2',
  planetSize = 12,
  trailLength = 5,
  className = '',
}: OrbitalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement>>([]);
  const angleRef = useRef<number>(Math.random() * Math.PI * 2);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Create container element
    const container = document.createElement('div');
    container.className = `${styles['orbital-container']} ${className}`;
    if (id) container.id = id;
    
    // Set container position
    container.style.left = `${centerX}%`;
    container.style.top = `${centerY}%`;
    
    // Create path element
    const path = document.createElement('div');
    path.className = styles['orbital-path'];
    path.style.width = `${radiusX * 2}px`;
    path.style.height = `${radiusY * 2}px`;
    path.style.borderColor = planetColor;
    path.style.opacity = '0.3';
    
    // Create planet element
    const planet = document.createElement('div');
    planet.className = styles.planet;
    planet.style.setProperty('--planet-size', `${planetSize}px`);
    planet.style.setProperty('--planet-color', planetColor);
    
    // Create trail points
    const trailPoints: HTMLDivElement[] = [];
    for (let i = 0; i < trailLength; i++) {
      const trailPoint = document.createElement('div');
      trailPoint.className = styles['trail-point'];
      trailPoint.style.setProperty('--planet-size', `${planetSize * 0.6}px`);
      trailPoint.style.setProperty('--planet-color', planetColor);
      trailPoints.push(trailPoint);
    }
    
    // Assemble
    path.appendChild(planet);
    trailPoints.forEach(tp => path.appendChild(tp));
    container.appendChild(path);
    
    document.body.appendChild(container);
    
    // Store refs
    containerRef.current = container;
    pathRef.current = path;
    planetRef.current = planet;
    trailRefs.current = trailPoints;
    
    // Animation loop
    const animate = () => {
      angleRef.current += speed;
      
      // Calculate planet position
      const planetX = Math.cos(angleRef.current) * radiusX;
      const planetY = Math.sin(angleRef.current) * radiusY;
      
      // Update planet position (relative to container)
      planetRef.current!.style.left = `calc(50% + ${planetX}px)`;
      planetRef.current!.style.top = `calc(50% + ${planetY}px)`;
      
      // Update trail points
      trailRefs.current.forEach((trailPoint, index) => {
        const trailAngle = angleRef.current - (index + 1) * 0.1;
        const trailRadius = radiusX * (1 - index / trailLength * 0.5);
        const trailX = Math.cos(trailAngle) * trailRadius;
        const trailY = Math.sin(trailAngle) * trailRadius * (radiusY / radiusX);
        
        trailPoint.style.left = `calc(50% + ${trailX}px)`;
        trailPoint.style.top = `calc(50% + ${trailY}px)`;
        trailPoint.style.opacity = `${0.3 * (1 - index / trailLength)}`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (containerRef.current) {
        containerRef.current.remove();
      }
    };
  }, [centerX, centerY, radiusX, radiusY, speed, planetColor, planetSize, trailLength, className, id]);

  return null; // Render nothing, elements managed in useEffect
}
```

- [ ] **Step 4: Run test to verify it compiles**

```bash
npm run dev
# Should start without errors
```

- [ ] **Step 5: Commit orbital system component**

```bash
git add .
git commit -m "feat: implement OrbitalSystem component"
```

### Task 5: Create Reusable UI Components

**Files:**
- Create: `src/components/ui/GlassmorphismCard.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Typography.tsx`
- Create: `src/components/ui/types.ts`

- [ ] **Step 1: Create glassmorphism card component**

```tsx
import { FC, ReactNode } from 'react';

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
    <div className={`glassmorphism-card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
};
```

- [ ] **Step 2: Create CSS for glassmorphism card**

```css
.glassmorphism-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.glassmorphism-card:hover {
  background: rgba(0, 0, 0, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.card-title {
  color: #00b4d8;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.card-content {
  color: #f8f9fa;
  line-height: 1.6;
}
```

- [ ] **Step 3: Create button component**

```tsx
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
```

- [ ] **Step 4: Create typography component**

```tsx
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
```

- [ ] **Step 5: Run test to verify all UI components compile**

```bash
npm run dev
# Should start without errors
```

- [ ] **Step 6: Commit UI components**

```bash
git add .
git commit -m "feat: create reusable UI components (GlassmorphismCard, Button, Typography)"
```

### Task 6: Implement Home Page with Interactive Features

**Files:**
- Create: `src/app/page.tsx` (update home page)
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/StatsSection.tsx`
- Create: `src/components/home/FeaturesSection.tsx`

- [ ] **Step 1: Update home page layout**

```tsx
import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import OrbitalSystem from '@/components/orbital/OrbitalSystem';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturesSection from '@/components/home/FeaturesSection';

export default function HomePage() {
  return (
    <MainLayout>
      <StarfieldBackground 
        starCount={90} 
        enableCursorInteraction={true} 
        enableComets={true} 
      />
      <OrbitalSystem 
        id="orbit-1"
        centerX={30}
        centerY={30}
        radiusX={120}
        radiusY={80}
        speed={0.03}
        planetColor="#ff006e"
        planetSize={14}
      />
      <OrbitalSystem 
        id="orbit-2"
        centerX={70}
        centerY={40}
        radiusX={100}
        radiusY={60}
        speed={0.04}
        planetColor="#00b4d8"
        planetSize={12}
      />
      <OrbitalSystem 
        id="orbit-3"
        centerX={50}
        centerY={70}
        radiusX={80}
        radiusY={50}
        speed={0.02}
        planetColor="#0077b6"
        planetSize={10}
      />
      <section className="relative z-10 pt-20 pb-16">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
      </section>
    </MainLayout>
  );
}
```

- [ ] **Step 2: Create hero section**

```tsx
import { Typography } from '@/components/ui/Typography';

export default function HeroSection() {
  return (
    <div className="text-center max-w-4xl mx-auto px-6">
      <Typography variant="h1" color="white" align="center">
        Willyb0t
      </Typography>
      <Typography variant="body2" color="secondary" align="center" className="mt-4 max-w-2xl mx-auto">
        Physics Enthusiast & Full-Stack Developer<br/>
        Building interactive experiences at the intersection of science and code
      </Typography>
      <div className="flex justify-center space-x-6 mt-8">
        <a href="/about" className="btn-primary btn-lg">
          About Me
        </a>
        <a href="/portfolio" className="btn-outline btn-lg">
          View Projects
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create stats section**

```tsx
import { Typography } from '@/components/ui/Typography';

export default function StatsSection() {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-6xl px-6 mt-12">
      <div className="text-center">
        <Typography variant="h2" color="accent" align="center" className="mb-2">
          5+
        </Typography>
        <Typography variant="body2" color="secondary" align="center" className="text-sm uppercase tracking-wider">
          Projects
        </Typography>
      </div>
      <div className="text-center">
        <Typography variant="h2" color="accent" align="center" className="mb-2">
          3
        </Typography>
        <Typography variant="body2" color="secondary" align="center" className="text-sm uppercase tracking-wider">
          Years Experience
        </Typography>
      </div>
      <div className="text-center">
        <Typography variant="h2" color="accent" align="center" className="mb-2">
          10+
        </Typography>
        <Typography variant="body2" color="secondary" align="center" className="text-sm uppercase tracking-wider">
          Technical Skills
        </Typography>
      </div>
      <div className="text-center">
        <Typography variant="h2" color="accent" align="center" className="mb-2">
          2
        </Typography>
        <Typography variant="body2" color="secondary" align="center" className="text-sm uppercase tracking-wider">
          Publications
        </Typography>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create features section**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function FeaturesSection() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mx-auto max-w-6xl px-6 mt-16">
      <GlassmorphismCard title="Interactive Observatory">
        <Typography variant="body1" color="white" align="left">
          Experience responds to your cursor with ripples in the starfield and orbiting celestial bodies that demonstrate both creativity and technical depth.
        </Typography>
      </GlassmorphismCard>
      <GlassmorphismCard title="Performance Optimized">
        <Typography variant="body1" color="white" align="left">
          Visual effects adapt to device capabilities, ensuring smooth interactions without sacrificing performance or accessibility.
        </Typography>
      </GlassmorphismCard>
      <GlassmorphismCard title="Scientific Precision">
        <Typography variant="body1" color="white" align="left">
          Every animation and interaction is grounded in real physics principles, from orbital trajectories to particle interaction dynamics.
        </Typography>
      </GlassmorphismCard>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify home page works**

```bash
npm run dev
# Visit homepage - should see starfield, orbiting systems, and UI
```

- [ ] **Step 6: Commit home page implementation**

```bash
git add .
git commit -m "feat: implement home page with starfield, orbital systems, and UI components"
```

### Task 7: Implement About Page Content

**Files:**
- Create: `src/app/about/page.tsx` (update)
- Create: `src/components/about/BioSection.tsx`
- Create: `src/components/about/ExperienceSection.tsx`
- Create: `src/components/about/SkillsSection.tsx`

- [ ] **Step 1: Update about page layout**

```tsx
import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import BioSection from '@/components/about/BioSection';
import ExperienceSection from '@/components/about/ExperienceSection';
import SkillsSection from '@/components/about/SkillsSection';

export default function AboutPage() {
  return (
    <MainLayout>
      <StarfieldBackground 
        starCount={60} 
        enableCursorInteraction={false} 
        enableComets={false} 
      />
      <section className="relative z-10 pt-20 pb-16">
        <BioSection />
        <ExperienceSection />
        <SkillsSection />
      </section>
    </MainLayout>
  );
}
```

- [ ] **Step 2: Create bio section**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function BioSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 mb-16">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        About Me
      </Typography>
      <GlassmorphismCard className="mb-8">
        <Typography variant="body1" color="white" align="left" className="space-y-4">
          <p>
            Passionate about the intersection of physics and technology, I specialize in creating 
            interactive experiences that make complex concepts accessible and engaging.
          </p>
          <p>
            My background in physics gives me a unique perspective on problem-solving, allowing me 
            to approach software development with analytical thinking and creative intuition.
          </p>
          <p>
            When I'm not coding, you can find me exploring astronomical phenomena, reading about 
            quantum mechanics, or experimenting with new ways to visualize scientific concepts.
          </p>
        </Typography>
      </GlassmorphismCard>
    </section>
  );
}
```

- [ ] **Step 3: Create experience section**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function ExperienceSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 mb-16">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Professional Experience
      </Typography>
      <GlassmorphismCard>
        <Typography variant="body1" color="white" align="left" className="space-y-6">
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2023-Present
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Senior Frontend Developer
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                Tech Innovations Inc.
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Led development of interactive data visualization platform used by research institutions worldwide.
              </Typography>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2021-2023
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Full-Stack Developer
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                Science Labs LLC
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Built web applications for scientific research, including real-time particle simulation tools.
              </Typography>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2019-2021
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Junior Developer
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                Web Solutions Agency
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Developed responsive websites and web applications for various clients in education and nonprofit sectors.
              </Typography>
            </div>
          </div>
        </Typography>
      </GlassmorphismCard>
    </section>
  );
}
```

- [ ] **Step 4: Create skills section**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function SkillsSection() {
  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Technical Skills
      </Typography>
      <GlassmorphismCard>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center">
            <Typography variant="h3" color="accent" align="center" className="mb-2">
              Frontend
            </Typography>
            <Typography variant="body2" color="white" align="left" className="space-y-1">
              • React • Next.js • TypeScript • Tailwind CSS<br/>
              • Framer Motion • CSS3 • HTML5 • JavaScript ES6+
            </Typography>
          </div>
          <div className="text-center">
            <Typography variant="h3" color="accent" align="center" className="mb-2">
              Backend
            </Typography>
            <Typography variant="body2" color="white" align="left" className="space-y-1">
              • Node.js • Python • REST APIs • GraphQL<br/>
              • PostgreSQL • MongoDB • Docker • AWS
            </Typography>
          </div>
          <div className="text-center">
            <Typography variant="h3" color="accent" align="center" className="mb-2">
              Physics & Math
            </Typography>
            <Typography variant="body2" color="white" align="left" className="space-y-1">
              • Classical Mechanics • Electromagnetism • Quantum Mechanics<br/>
              • Thermodynamics • Calculus • Linear Algebra • Differential Equations
            </Typography>
          </div>
        </div>
      </GlassmorphismCard>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify about page works**

```bash
npm run dev
# Visit /about - should see bio, experience, and skills sections
```

- [ ] **Step 6: Commit about page implementation**

```bash
git add .
git commit -m "feat: implement about page with bio, experience, and skills sections"
```

### Task 8: Implement Portfolio Page

**Files:**
- Create: `src/app/portfolio/page.tsx` (update)
- Create: `src/components/project/ProjectCard.tsx`
- Create: `src/components/project/ProjectFilters.tsx`
- Create: `src/components/project/ProjectGrid.tsx`
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create project data**

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // URL or path
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Interactive Particle Simulator',
    description: 'A web-based particle physics simulator that allows users to experiment with different particle types, forces, and boundary conditions in real-time.',
    image: '/images/project1.jpg',
    technologies: ['React', 'Three.js', 'TypeScript', 'CSS3'],
    githubUrl: 'https://github.com/willyb0t/particle-simulator',
    liveUrl: 'https://particle-simulator.willyb0t.dev',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Orbital Mechanics Visualizer',
    description: 'An interactive tool for visualizing and experimenting with orbital mechanics, including Kepler\'s laws, escape velocity, and orbital transfers.',
    image: '/images/project2.jpg',
    technologies: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com/willyb0t/orbital-visualizer',
    liveUrl: 'https://orbital-visualizer.willyb0t.dev',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Quantum Circuit Designer',
    description: 'A drag-and-drop interface for designing and simulating quantum circuits, with support for common quantum gates and measurements.',
    image: '/images/project3.jpg',
    technologies: ['React', 'Redux', 'Canvas API', 'TypeScript'],
    githubUrl: 'https://github.com/willyb0t/quantum-circuit-designer',
    liveUrl: 'https://quantum-circuit.willyb0t.dev',
    featured: false,
  },
  {
    id: 'project-4',
    title: 'Astrophotography Portfolio',
    description: 'A showcase of astrophotography images with detailed information about celestial objects, exposure settings, and processing techniques.',
    image: '/images/project4.jpg',
    technologies: ['Next.js', 'Tailwind CSS', 'Swiper', 'PHP'],
    githubUrl: 'https://github.com/willyb0t/astrophotography',
    liveUrl: 'https://astro.willyb0t.dev',
    featured: false,
  },
];
```

- [ ] **Step 2: Update portfolio page layout**

```tsx
import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import ProjectFilters from '@/components/project/ProjectFilters';
import ProjectGrid from '@/components/project/ProjectGrid';
import { projects } from '@/data/projects';

export default function PortfolioPage() {
  return (
    <MainLayout>
      <StarfieldBackground 
        starCount={70} 
        enableCursorInteraction={true} 
        enableComets={false} 
      />
      <section className="relative z-10 pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <Typography variant="h2" color="accent" align="center" className="mb-8">
            Portfolio
          </Typography>
          <ProjectFilters projects={projects} />
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </MainLayout>
  );
}
```

- [ ] **Step 3: Create project filters component**

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Project } from '@/data/projects';

interface ProjectFiltersProps {
  projects: Project[];
}

export default function ProjectFilters({ projects }: ProjectFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  
  // Extract unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(p => p.technologies))
  ).sort();
  
  const filters = ['All', ...allTechnologies];
  
  return (
    <div className="mb-8 flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selectedFilter === filter ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create project grid component**

```tsx
import { ProjectCard } from '@/components/project/ProjectCard';
import { Project } from '@/data/projects';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const filteredProjects = projects; // Filtering would be implemented in ProjectFilters context
  
  return (
    <div className="grid gap-6">
      <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create project card component**

```tsx
import Link from 'next/link';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={project.liveUrl || project.githubUrl || '#'} className="block hover:no-underline">
      <GlassmorphismCard className="h-full">
        {project.featured && (
          <div className="absolute top-2 right-2 bg-vibrant-purple/20 text-vibrant-purple px-2 py-1 rounded text-xs">
            FEATURED
          </div>
        )}
        <div className="relative h-48 mb-4">
          {/* In a real app, this would be an actual image */}
          <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
            <Typography variant="body2" color="secondary" align="center">
              Image Preview
            </Typography>
          </div>
        </div>
        <Typography variant="h3" color="accent" align="left" className="mb-2">
          {project.title}
        </Typography>
        <Typography variant="body2" color="white" align="left" className="mb-3">
          {project.description}
        </Typography>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="bg-gray-700/30 text-xs px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-electric-blue hover:underline">
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-electric-blue hover:underline">
              Live Demo
            </a>
          )}
        </div>
      </GlassmorphismCard>
    </Link>
  );
}
```

- [ ] **Step 6: Run test to verify portfolio page works**

```bash
npm run dev
# Visit /portfolio - should see project grid with filtering
```

- [ ] **Step 7: Commit portfolio page implementation**

```bash
git add .
git commit -m "feat: implement portfolio page with project grid and filtering"
```

### Task 9: Implement Remaining Pages (Skills, Experience, Education, Contact)

**Files:**
- Create: `src/app/skills/page.tsx` (update)
- Create: `src/app/experience/page.tsx` (update)
- Create: `src/app/education/page.tsx` (update)
- Create: `src/app/contact/page.tsx` (update)
- Create: `src/components/skills/SkillsDetail.tsx`
- Create: `src/components/experience/ExperienceTimeline.tsx`
- Create: `src/components/education/EducationSection.tsx`
- Create: `src/components/contact/ContactForm.tsx`

- [ ] **Step 1: Update skills page**

```tsx
import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import SkillsDetail from '@/components/skills/SkillsDetail';

export default function SkillsPage() {
  return (
    <MainLayout>
      <StarfieldBackground 
        starCount={60} 
        enableCursorInteraction={false} 
        enableComets={false} 
      />
      <section className="relative z-10 pt-20 pb-16">
        <SkillsDetail />
      </section>
    </MainLayout>
  );
}
```

- [ ] **Step 2: Create skills detail component**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { projects } from '@/data/projects';

export default function SkillsDetail() {
  // Extract and count technologies from projects
  const techCounts: Record<string, number> = {};
  projects.forEach(project => {
    project.technologies.forEach(tech => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;
    });
  });
  
  const sortedTech = Object.entries(techCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tech]) => tech);
  
  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Technical Skills Detail
      </Typography>
      <GlassmorphismCard>
        <Typography variant="body1" color="white" align="left" className="space-y-4">
          <p>
            Below is a breakdown of the technologies I've worked with, based on project experience:
          </p>
          <div className="space-y-2">
            {sortedTech.map((tech, index) => (
              <div key={index} className="flex justify-between">
                <Typography variant="body2" color="white" align="left">
                  {tech}
                </Typography>
                <Typography variant="body2" color="accent" align="right">
                  {techCounts[tech]} projects
                </Typography>
              </div>
            ))}
          </div>
        </Typography>
      </GlassmorphismCard>
    </section>
  );
}
```

- [ ] **Step 3: Update experience page**

```tsx
import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import ExperienceTimeline from '@/components/experience/ExperienceTimeline';

export default function ExperiencePage() {
  return (
    <MainLayout>
      <StarfieldBackground 
        starCount={60} 
        enableCursorInteraction={false} 
        enableComets={false} 
      />
      <section className="relative z-10 pt-20 pb-16">
        <ExperienceTimeline />
      </section>
    </MainLayout>
  );
}
```

- [ ] **Step 4: Create experience timeline component**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function ExperienceTimeline() {
  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Experience Timeline
      </Typography>
      <GlassmorphismCard>
        <div className="space-y-6">
          {/* Experience items would be similar to AboutPage experience section */}
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2023-Present
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Senior Frontend Developer
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                Tech Innovations Inc.
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Led development of interactive data visualization platform used by research institutions worldwide.
              </Typography>
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Key achievements:
              </Typography>
              <ul className="list-disc list-inside space-y-1 mt-1 text-sm">
                <li>Reduced load times by 65% through code splitting and lazy loading</li>
                <li>Implemented real-time collaboration features using WebSockets</li>
                <li>Mentored 3 junior developers in React and TypeScript best practices</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2021-2023
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Full-Stack Developer
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                Science Labs LLC
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Built web applications for scientific research, including real-time particle simulation tools.
              </Typography>
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Technologies used:
              </Typography>
              <Typography variant="body2" color="white" align="left" className="ml-4">
                • React • Node.js • PostgreSQL • Docker • AWS
              </Typography>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2019-2021
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Junior Developer
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                Web Solutions Agency
              </Typography>
              <Typography variant="b1" color="white" align="left" className="mt-1">
                Developed responsive websites and web applications for various clients in education and nonprofit sectors.
              </Typography>
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Technologies used:
              </Typography>
              <Typography variant="body2" color="white" align="left" className="ml-4">
                • HTML5 • CSS3 • JavaScript • PHP • WordPress
              </Typography>
            </div>
          </div>
        </div>
      </GlassmorphismCard>
    </section>
  );
}
```

- [ ] **Step 5: Update education page**

```tsx
import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import EducationSection from '@/components/education/EducationSection';

export default function EducationPage() {
  return (
    <MainLayout>
      <StarfieldBackground 
        starCount={60} 
        enableCursorInteraction={false} 
        enableComets={false} 
      />
      <section className="relative z-10 pt-20 pb-16">
        <EducationSection />
      </section>
    </MainLayout>
  );
}
```

- [ ] **Step 6: Create education section component**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function EducationSection() {
  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Education
      </Typography>
      <GlassmorphismCard>
        <Typography variant="body1" color="white" align="left" className="space-y-4">
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2015-2019
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Bachelor of Science in Physics
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                University of Science and Technology
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Relevant coursework: Classical Mechanics, Electromagnetism, Quantum Mechanics, Thermodynamics, Mathematical Physics, Computer Programming for Scientists
              </Typography>
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Thesis:
              </Typography>
              <Typography variant="body1" color="white" align="left" className="ml-4">
                "Applications of Quantum Computing in Cryptographic Systems"
              </Typography>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2019-2021
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Master of Science in Computer Science
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                University of Science and Technology
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Relevant coursework: Advanced Algorithms, Machine Learning, Computer Graphics, Human-Computer Interaction, Software Engineering Principles
              </Typography>
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Thesis:
              </Typography>
              <Typography variant="body1" color="white" align="left" className="ml-4">
                "Interactive Visualization Techniques for Complex Scientific Data"
              </Typography>
            </div>
          </div>
        </Typography>
      </GlassmorphismCard>
    </section>
  );
}
```

- [ ] **Step 7: Update contact page**

```tsx
import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <MainLayout>
      <StarfieldBackground 
        starCount={60} 
        enableCursorInteraction={false} 
        enableComets={false} 
      />
      <section className="relative z-10 pt-20 pb-16">
        <ContactForm />
      </section>
    </MainLayout>
  );
}
```

- [ ] **Step 8: Create contact form component**

```tsx
import { useState } from 'react';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function ContactForm() {
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  } | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Contact Me
      </Typography>
      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitStatus.type === 'success' 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          <Typography variant="body1" color="white" align="left">
            {submitStatus.message}
          </Typography>
        </div>
      )}
      <GlassmorphismCard>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Typography variant="body2" color="white" align="left" className="mb-2">
              Name
            </Typography>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/20 text-white border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <Typography variant="body2" color="white" align="left" className="mb-2">
              Email
            </Typography>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/20 text-white border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div>
            <Typography variant="body2" color="white" align="left" className="mb-2">
              Subject
            </Typography>
            <input
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/20 text-white border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="Subject of your message"
              required
            />
          </div>
          <div>
            <Typography variant="body2" color="white" align="left" className="mb-2">
              Message
            </Typography>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/20 text-white border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              rows="6"
              placeholder="Your message here..."
              required
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </GlassmorphismCard>
    </section>
  );
}
```

- [ ] **Step 9: Run test to verify all pages work**

```bash
npm run dev
# Visit each page: /skills, /experience, /education, /contact
```

- [ ] **Step 10: Commit remaining pages implementation**

```bash
git add .
git commit -m "feat: implement remaining pages (skills, experience, education, contact)"
```

### Task 10: Polish, Optimize, and Test

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Update: `src/app/layout.tsx` (add footer)
- Create: `src/styles/globals.css` (update with final styles)
- Create: `README.md`
- Update: `package.json` (add scripts for testing, linting, etc.)

- [ ] **Step 1: Create footer component**

```tsx
import { Typography } from '@/components/ui/Typography';

export default function Footer() {
  return (
    <footer className="border-t border-gray-600/30 mt-20 pt-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Typography variant="body2" color="secondary" align="center" className="mb-4">
          © {new Date().getFullYear()} Willyb0t. All rights reserved.
        </Typography>
        <div className="flex justify-center space-x-4 text-sm">
          <a href="#" className="text-secondary hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-secondary hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-secondary hover:text-white transition-colors">
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Update layout to include footer**

```tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Orbitron } from 'next/font/google';
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Update global styles**

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
  }
  
  body {
    @apply bg-black text-stellar-white;
    font-feature-settings: "rlig" 1, "calt" 1; /* Enable ligatures and contextual alternates for better text rendering */
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  /* Customize scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-black/50;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-gray-600/50 rounded-full hover:bg-gray-600;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-600;
  }
}

/* Animations for reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  
  /* Disable starfield animations but keep basic interactivity */
  .star {
    animation: none !important;
  }
}
```

- [ ] **Step 4: Add performance optimizations**

```json
// package.json - add scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "format": "prettier --write \"**/*.{js,ts,jsx,tsx,css,md}\"",
    "analyze": "ANALYZE=true next build"
  }
}
```

- [ ] **Step 5: Create README.md**

```markdown
# Willyb0t Portfolio

A modern, interactive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features an immersive space/observatory theme with interactive starfield, orbital systems, and smooth animations.

## Features

- **Interactive Starfield**: Cursor-reactive starfield with ripples and trailing effects
- **Orbital Systems**: Multiple orbiting celestial bodies with realistic physics
- **Modern UI**: Glassmorphism cards, smooth animations, and responsive design
- **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- **Performant**: Optimized for fast loading and smooth 60fps animations
- **Multi-page**: Home, About, Portfolio, Skills, Experience, Education, and Contact pages

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, CSS animations
- **Icons**: React Icons
- **Fonts**: Google Fonts (Orbitron, Inter, Space Grotesk)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the site

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable UI components
- `/src/components/layout` - Layout components (navbar, footer)
- `/src/components/background` - Starfield background system
- `/src/components/orbital` - Orbital system components
- `/src/components/ui` - Reusable UI components (buttons, cards, typography)
- `/src/components/home` - Home page specific components
- `/src/components/about` - About page specific components
- `/src/components/project` - Portfolio page components
- `/src/components/skills` - Skills page components
- `/src/components/experience` - Experience page components
- `/src/components/education` - Education page components
- `/src/components/contact` - Contact page components
- `/src/data` - Data files (projects, etc.)

## Accessibility

This site follows WCAG 2.1 AA guidelines:
- Proper color contrast ratios (minimum 4.5:1)
- Keyboard navigable interface
- Semantic HTML structure
- ARIA labels where needed
- Respects reduced motion preferences
- Focus visible indicators
- Skip navigation links

## Performance Optimizations

- Code splitting and lazy loading
- Image optimization with Next.js Image
- CSS and JavaScript minification
- Efficient animation techniques (requestAnimationFrame, CSS transforms)
- Limited particle counts based on device capability
- Asset optimization and compression

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the beauty of physics and the universe
- Built with passion for creating interactive experiences
- Thanks to the open-source community for amazing tools and libraries
```

- [ ] **Step 6: Run final tests**

```bash
npm run lint
npm run build
# Check for any errors
```

- [ ] **Step 7: Commit final polish**

```bash
git add .
git commit -m "feat: add polish, optimization, documentation, and final testing"
```

### Task 11: Final Review and Deployment Preparation

**Files:**
- Update: `package.json` (add repository, bugs, homepage fields)
- Create: `vercel.json` (Vercel deployment config)
- Update: `next.config.js` (add any final configurations)
- Create: `.vercel/project.json` (Vercel project settings)
- Update: `README.md` (add deployment instructions)

- [ ] **Step 1: Update package.json with metadata**

```json
{
  "name": "willyb0t-portfolio",
  "version": "1.0.0",
  "description": "Portfolio of Willyb0t - Physics Enthusiast & Full-Stack Developer",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/willyb0t/portfolio.git"
  },
  "keywords": [
    "portfolio",
    "nextjs",
    "typescript",
    "tailwindcss",
    "framer-motion",
    "physics",
    "science"
  ],
  "author": "Willyb0t",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/willyb0t/portfolio/issues"
  },
  "homepage": "https://github.com/willyb0t/portfolio#readme"
}
```

- [ ] **Step 2: Create Vercel configuration**

```json
// vercel.json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';"
        }
      ]
    }
  ]
}
```

- [ ] **Step 3: Update next.config.js with any final settings**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    appDir: true,
  },
  // Add any additional configurations here
  // For example, analytics, webpack config, etc.
};

module.exports = nextConfig;
```

- [ ] **Step 4: Add deployment instructions to README**

```markdown
## Deployment

This portfolio is optimized for deployment on Vercel, the platform built for Next.js applications.

### Deploy to Vercel

1. Push your code to a GitHub repository
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project and configure the build settings
5. Click "Deploy" and wait for the build to complete
6. Your site will be live at a vercel.app domain (you can add a custom domain later)

### Manual Deployment

If you prefer to deploy manually:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. The application will be available at http://localhost:3000
   (For production deployment, use a process manager like PM2 or deploy to a Node.js hosting service)
```

- [ ] **Step 5: Run final verification**

```bash
npm run lint
npm run build
npm start
# Visit http://localhost:3000 to verify everything works
# Test all pages and interactive features
```

- [ ] **Step 6: Commit final deployment preparation**

```bash
git add .
git commit -m "feat: add deployment configuration, final metadata, and verification"
```

### Task 12: Final Commit and Cleanup

**Files:**
- No new files, just final commit

- [ ] **Step 1: Final verification of all functionality**

```bash
# Check that all pages load correctly
# Test starfield interaction
# Test orbital systems movement
# Test all UI components
# Test form submission (contact page)
# Test navigation between pages
# Check responsive design on different viewport sizes
# Verify accessibility with screen reader and keyboard navigation
```

- [ ] **Step 2: Final commit**

```bash
git add .
git commit -m "feat: complete Willyb0t portfolio implementation - all features implemented and tested"
```

- [ ] **Step 3: Tag the release**

```bash
git tag -v v1.0.0
git push origin v1.0.0
```