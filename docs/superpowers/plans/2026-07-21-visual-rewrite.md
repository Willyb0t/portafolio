# Portfolio Visual Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the portfolio codebase so every visual element of the approved spec (`docs/superpowers/specs/2026-07-21-visual-rewrite-design.md`) works on Next.js 16: canvas starfield with cursor wake and physically-correct comets, true elliptical orbital systems, glassmorphism UI, Framer Motion reveals, scrollable-tab mobile nav — all UI text in Spanish, centralized in data files.

**Architecture:** Next.js 16 App Router (Server Components by default, small `'use client'` islands), Tailwind CSS v3.4, one shared `CosmicBackground` mounted in the root layout (canvas starfield + CSS orbitals + formula texture), all copy in `src/data/content.ts` / `src/data/navigation.ts` / `src/data/projects.ts` so the user can edit text without touching components.

**Tech Stack:** Next.js 16.2.7, React 19.2.4, TypeScript strict, Tailwind CSS 3.4, framer-motion@^12, pnpm.

## Global Constraints

- Next.js **16.2.7** / React **19.2.4** — do not downgrade; Turbopack is the default bundler (no webpack config allowed).
- Tailwind CSS **v3.4** only (pinned in `claude.md`); config in `tailwind.config.js`, PostCSS plugins in `postcss.config.js` (`tailwindcss` + `autoprefixer`). Do NOT introduce `@tailwindcss/postcss` or v4 syntax.
- **pnpm** is the only package manager (`pnpm-lock.yaml`); never run `npm install` / never recreate `package-lock.json`.
- All UI text in **Spanish** (labels, headings, placeholders, aria-labels, metadata). Project repo names/URLs stay in English.
- Palette (exact hex): `space-black #000000`, `space-blue #000816`, `electric-blue #00b4d8`, `vibrant-purple #0077b6`, `cosmic-pink #ff006e`, `stellar-white #f8f9fa`, `space-gray #f0f0f0`.
- `claude.md` rules: TypeScript strict; components in `/components` with PascalCase names; no horizontal scroll at any viewport; CSS Grid over Flexbox for page layouts; **no hamburger menu**; no stock/placeholder images (no unsplash); no Lorem Ipsum; max 3 content font sizes per page (page title `text-3xl md:text-4xl`, section/card heading `text-xl md:text-2xl`, body `text-base`; home hero may swap the page-title size for `text-4xl md:text-6xl`. UI chrome — nav links, badges, chips, footer — may use `text-sm`/`text-xs`).
- Respect `prefers-reduced-motion` everywhere (global CSS + `MotionConfig reducedMotion="user"` + static starfield fallback).
- **Verification model:** this project has no unit-test runner (spec: "Verification" section). Each task's gate is: `pnpm build` passes (type-check + compile), `pnpm lint` passes, plus the task's manual checklist in `pnpm dev`. Every task ends in a commit.

---

### Task 1: Config cleanup + green build baseline

The build is currently RED (named-import of a default export; props passed to prop-less components). This task removes conflicting configs and applies the minimal fixes that make `pnpm build` and `pnpm lint` pass. Full rewrites come in later tasks.

**Files:**
- Delete: `next.config.js`, `postcss.config.mjs`, `package-lock.json`, `src/components/ui/GlassmorphismCard.module.css`
- Modify: `next.config.ts`, `package.json`
- Modify: `src/components/ui/GlassmorphismCard.tsx` (add named export)
- Modify: `src/components/background/StarfieldBackground.tsx` (accept props, minimal)
- Modify: `src/components/orbital/OrbitalSystem.tsx` (accept props, minimal)
- Run: `git rm --cached tsconfig.tsbuildinfo` (tracked despite `*.tsbuildinfo` in `.gitignore`)

**Interfaces:**
- Produces: `GlassmorphismCard` as BOTH named and default export from `@/components/ui/GlassmorphismCard` — signature `{ children: ReactNode; className?: string }`.
- Produces: `StarfieldBackgroundProps { starCount?: number; enableCursorInteraction?: boolean; enableComets?: boolean; className?: string }` — consumed by pages until Task 3 replaces the implementation (same prop names).
- Produces: `OrbitalSystemProps { className?: string }` (widened in Task 4 — same prop name).

- [ ] **Step 1: Delete conflicting and dead files**

```bash
rm next.config.js postcss.config.mjs package-lock.json src/components/ui/GlassmorphismCard.module.css
git rm --cached tsconfig.tsbuildinfo
```

- [ ] **Step 2: Fix `next.config.ts`** (remove deprecated `images.domains`)

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Fix `package.json` scripts and install framer-motion**

Edit the `scripts` block to exactly (`next lint` was removed in Next 16; `jest`, `prettier`, and the bundle analyzer are not installed):

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
},
```

Then install framer-motion:

```bash
pnpm add framer-motion
```

Expected: `framer-motion` (v12.x) added to `dependencies`, lockfile updated.

- [ ] **Step 4: Fix `GlassmorphismCard.tsx` — named export** (spec-exact styles, keeps default export for compatibility)

```tsx
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
```

- [ ] **Step 5: Make `StarfieldBackground.tsx` accept its props (minimal interim fix)**

Change ONLY the signature of the existing component and the canvas className (implementation replaced in Task 3). Destructure `className` so it is actually consumed (avoids unused-parameter lint errors); `starCount`/`enableCursorInteraction`/`enableComets` are accepted by the type but intentionally not read until Task 3:

```tsx
"use client";
import React, { useEffect, useRef } from 'react';

export interface StarfieldBackgroundProps {
  starCount?: number;
  enableCursorInteraction?: boolean;
  enableComets?: boolean;
  className?: string;
}

export default function StarfieldBackground({ className = '' }: StarfieldBackgroundProps) {
  // ... existing body unchanged ...
  return <canvas ref={canvasRef} className={`fixed inset-0 z-[-1] pointer-events-none ${className}`} />;
}
```

- [ ] **Step 6: Make `OrbitalSystem.tsx` accept `className` (minimal interim fix)**

Change ONLY the signature of the existing component:

```tsx
import React from 'react';

export interface OrbitalSystemProps {
  className?: string;
}

export default function OrbitalSystem({ className = '' }: OrbitalSystemProps) {
  return (
    <div className={`relative flex items-center justify-center w-80 h-80 pointer-events-none opacity-60 ${className}`}>
      {/* ... existing body unchanged ... */}
    </div>
  );
}
```

- [ ] **Step 7: Verify build and lint pass**

```bash
pnpm build
```

Expected: `✓ Compiled successfully`, all 7 routes prerendered, no type errors.

```bash
pnpm lint
```

Expected: no errors (warnings acceptable, but fix any errors).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: remove conflicting configs, fix exports and props for green build

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Design tokens — Tailwind fonts + global styles

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: Tailwind `fontFamily` utilities `font-sans` (Inter), `font-display` (Orbitron), `font-grotesk` (Space Grotesk), `font-mono` (JetBrains Mono) backed by CSS variables `--font-inter`, `--font-orbitron`, `--font-space-grotesk`, `--font-jetbrains-mono` (variables are defined in Task 4's layout via `next/font`).
- Produces: CSS `@keyframes orbit-spin` (consumed by `OrbitalSystem` inline `animation` in Task 3).
- Produces: `.no-scrollbar` utility (consumed by `Navbar` mobile tab row in Task 4).

- [ ] **Step 1: Add font families to `tailwind.config.js`**

Replace the whole file with:

```js
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
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' }
        },
        pulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' }
        }
      }
    }
  },
  plugins: [],
}
```

(Note: the unused `orbit` animation/keyframes are dropped — Task 3 uses the `orbit-spin` keyframes from `globals.css` via inline styles instead.)

- [ ] **Step 2: Rewrite `src/app/globals.css`**

Replace the whole file with (fixes the duplicated `body` rules and the `.meteor`/`.star` dead CSS):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-space-black text-stellar-white font-sans antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  ::selection {
    @apply bg-electric-blue/30 text-stellar-white;
  }
}

@layer components {
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-black/50;
  }

  ::-webkit-scrollbar-thumb {
    @apply rounded-full bg-gray-600/50;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-600;
  }
}

@layer utilities {
  /* Hide scrollbars while keeping scroll (mobile nav tab row) */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* Orbital ring rotation — consumed by OrbitalSystem via inline `animation`.
   Defined globally so the keyframes always exist regardless of utility usage. */
@keyframes orbit-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Gentle pulse for glowing cores */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

/* Reduced motion: kill all non-essential animation */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }

  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 3: Verify and commit**

```bash
pnpm build && pnpm lint
```

Expected: both pass.

```bash
git add tailwind.config.js src/app/globals.css
git commit -m "feat: add font design tokens and clean global styles

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: StarfieldBackground rewrite (canvas, spec-exact comets)

Fixes every defect in the current implementation: anonymous listeners that can't be removed (leak), no HiDPI scaling, comets spawning only at the top with a wrong tail vector, no reduced-motion fallback, no tab-visibility pause.

**Files:**
- Modify: `src/components/background/StarfieldBackground.tsx` (full rewrite)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: default export `StarfieldBackground(props: StarfieldBackgroundProps)`; props (unchanged from Task 1): `{ starCount?: number; enableCursorInteraction?: boolean; enableComets?: boolean; className?: string }`. Consumed by `CosmicBackground` (Task 4) with NO `starCount` (density auto: 100/75/50 by viewport).

- [ ] **Step 1: Rewrite `src/components/background/StarfieldBackground.tsx`**

Replace the whole file with:

```tsx
'use client';

import { useEffect, useRef } from 'react';

export interface StarfieldBackgroundProps {
  starCount?: number;
  enableCursorInteraction?: boolean;
  enableComets?: boolean;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleDirection: 1 | -1;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
}

const INTERACTION_RADIUS = 120;
const MAX_COMETS_DESKTOP = 3;
const MAX_COMETS_MOBILE = 2;
const COMET_SPAWN_CHANCE = 0.005; // 0.5 % per frame (spec: 0.5–2 %)
const MOBILE_COMET_FACTOR = 0.25; // mobile frequency reduced 75 % (spec)
const OFFSCREEN_MARGIN = 100;

function defaultStarCount(width: number): number {
  if (width > 1024) return 100;
  if (width > 768) return 75;
  return 50;
}

export default function StarfieldBackground({
  starCount,
  enableCursorInteraction = true,
  enableComets = true,
  className = '',
}: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let stars: Star[] = [];
    let comets: Comet[] = [];
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: -10000, y: -10000 };

    const initStars = () => {
      const count = starCount ?? defaultStarCount(window.innerWidth);
      stars = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          size: 0.5 + Math.random() * 1.5,
          opacity: 0.2 + Math.random() * 0.8,
          twinkleSpeed: 0.003 + Math.random() * 0.009,
          twinkleDirection: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(1, '#000816');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStars = (animateTwinkle: boolean) => {
      const interactive = animateTwinkle && enableCursorInteraction;
      for (const star of stars) {
        if (animateTwinkle) {
          star.opacity += star.twinkleSpeed * star.twinkleDirection;
          if (star.opacity >= 1) {
            star.opacity = 1;
            star.twinkleDirection = -1;
          } else if (star.opacity <= 0.2) {
            star.opacity = 0.2;
            star.twinkleDirection = 1;
          }
        }

        if (interactive) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const distance = Math.hypot(dx, dy);
          if (distance < INTERACTION_RADIUS && distance > 0.01) {
            // Wake effect: stars repel from the cursor, force ∝ proximity
            const force = (INTERACTION_RADIUS - distance) / INTERACTION_RADIUS;
            star.x -= (dx / distance) * force * 1.5;
            star.y -= (dy / distance) * force * 1.5;
          } else {
            // Spring back to base position
            star.x += (star.baseX - star.x) * 0.02;
            star.y += (star.baseY - star.y) * 0.02;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 249, 250, ${star.opacity})`;
        ctx.fill();
      }
    };

    const spawnComet = () => {
      const edge = Math.floor(Math.random() * 4);
      const speed = 2 + Math.random() * 3;
      let x = 0;
      let y = 0;
      let vx = 0;
      let vy = 0;
      switch (edge) {
        case 0: // top → downward
          x = Math.random() * width;
          y = -60;
          vx = (Math.random() - 0.5) * speed;
          vy = speed * (0.6 + Math.random() * 0.4);
          break;
        case 1: // right → leftward
          x = width + 60;
          y = Math.random() * height * 0.7;
          vx = -speed * (0.6 + Math.random() * 0.4);
          vy = (Math.random() - 0.3) * speed;
          break;
        case 2: // bottom → upward
          x = Math.random() * width;
          y = height + 60;
          vx = (Math.random() - 0.5) * speed;
          vy = -speed * (0.6 + Math.random() * 0.4);
          break;
        default: // left → rightward
          x = -60;
          y = Math.random() * height * 0.7;
          vx = speed * (0.6 + Math.random() * 0.4);
          vy = (Math.random() - 0.3) * speed;
      }
      comets.push({ x, y, vx, vy, length: 40 + Math.random() * 60 });
    };

    const drawComets = () => {
      const isMobile = width < 768;
      const maxComets = isMobile ? MAX_COMETS_MOBILE : MAX_COMETS_DESKTOP;
      const spawnChance = COMET_SPAWN_CHANCE * (isMobile ? MOBILE_COMET_FACTOR : 1);
      if (Math.random() < spawnChance && comets.length < maxComets) {
        spawnComet();
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.x += comet.vx;
        comet.y += comet.vy;

        if (
          comet.x < -OFFSCREEN_MARGIN ||
          comet.x > width + OFFSCREEN_MARGIN ||
          comet.y < -OFFSCREEN_MARGIN ||
          comet.y > height + OFFSCREEN_MARGIN
        ) {
          comets.splice(i, 1);
          continue;
        }

        // Tail points OPPOSITE to the velocity vector; gradient fades head → tail
        const magnitude = Math.hypot(comet.vx, comet.vy);
        const tailX = comet.x - (comet.vx / magnitude) * comet.length;
        const tailY = comet.y - (comet.vy / magnitude) * comet.length;
        const gradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      }
    };

    const animate = () => {
      drawBackground();
      drawStars(true);
      if (enableComets) drawComets();
      animationFrameId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(animate);
    };

    const stopLoop = () => cancelAnimationFrame(animationFrameId);

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    };

    const handleMouseOut = () => {
      mouse.x = -10000;
      mouse.y = -10000;
    };

    let resizeTimeout: number | undefined;
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        resize();
        if (reducedMotion) {
          // Static mode needs a manual redraw after resize
          drawBackground();
          drawStars(false);
        }
      }, 150);
    };

    resize();
    window.addEventListener('resize', handleResize);

    if (reducedMotion) {
      // Static starfield: drawn once, no loop, no comets, no cursor interaction
      drawBackground();
      drawStars(false);
      return () => {
        window.clearTimeout(resizeTimeout);
        window.removeEventListener('resize', handleResize);
      };
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    startLoop();

    return () => {
      stopLoop();
      window.clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [starCount, enableCursorInteraction, enableComets]);

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
```

- [ ] **Step 2: Verify build + lint**

```bash
pnpm build && pnpm lint
```

Expected: both pass.

- [ ] **Step 3: Manual check**

```bash
pnpm dev
```

Open `http://localhost:3000`. Checklist:
- Stars twinkle; moving the cursor pushes nearby stars away (wake); stars drift back after.
- Within ~30 s, a comet crosses the screen with its tail TRAILING opposite its motion (fading tail, bright head).
- Resize the window — starfield adapts without errors.
- DevTools → Rendering → emulate `prefers-reduced-motion: reduce` + reload — static stars, no motion, no comets.

Stop the dev server (`Ctrl+C`).

- [ ] **Step 4: Commit**

```bash
git add src/components/background/StarfieldBackground.tsx
git commit -m "feat: rewrite starfield canvas with spec-exact comets and reduced-motion fallback

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: OrbitalSystem (true ellipses) + CosmicBackground

The current orbital code puts `rotateX` and the spin animation on the SAME element — the animation overrides `rotateX`, so "ellipses" render as circles. Fix: `rotateX` on a parent, spin on the child ring, with `perspective` on the container.

**Files:**
- Modify: `src/components/orbital/OrbitalSystem.tsx` (full rewrite)
- Create: `src/components/background/CosmicBackground.tsx`

**Interfaces:**
- Consumes: `StarfieldBackground` from Task 3; `@keyframes orbit-spin` from Task 2.
- Produces: `OrbitalSystem` default export with props `OrbitalSystemProps` (below) — consumed by `CosmicBackground` and home `HeroSection` (Task 5).
- Produces: `CosmicBackground` default export, no props — mounted once in the root layout (Task 5).

```ts
export interface OrbitalRing {
  scale: number;         // ring diameter relative to container (1 = 100 %)
  duration: number;      // seconds per revolution
  reverse?: boolean;
  tiltX?: number;        // ellipse tilt, deg (default 70)
  rotation?: number;     // plane rotation, deg (default 0)
  satelliteColor: string;
  satelliteSize: number; // px
}

export interface OrbitalSystemProps {
  size?: number;         // container edge px (default 320)
  coreColor?: string;    // default '#00b4d8'
  coreSize?: number;     // px (default 32)
  rings?: OrbitalRing[]; // default: 3 rings (purple 15 s, pink 25 s reverse, white 8 s)
  className?: string;
}
```

- [ ] **Step 1: Rewrite `src/components/orbital/OrbitalSystem.tsx`**

Replace the whole file with:

```tsx
export interface OrbitalRing {
  scale: number;
  duration: number;
  reverse?: boolean;
  tiltX?: number;
  rotation?: number;
  satelliteColor: string;
  satelliteSize: number;
}

export interface OrbitalSystemProps {
  size?: number;
  coreColor?: string;
  coreSize?: number;
  rings?: OrbitalRing[];
  className?: string;
}

const defaultRings: OrbitalRing[] = [
  { scale: 1, duration: 15, tiltX: 70, rotation: -12, satelliteColor: '#0077b6', satelliteSize: 12 },
  { scale: 1.4, duration: 25, reverse: true, tiltX: 75, rotation: 45, satelliteColor: '#ff006e', satelliteSize: 8 },
  { scale: 0.7, duration: 8, tiltX: 65, rotation: 90, satelliteColor: '#f8f9fa', satelliteSize: 6 },
];

export default function OrbitalSystem({
  size = 320,
  coreColor = '#00b4d8',
  coreSize = 32,
  rings = defaultRings,
  className = '',
}: OrbitalSystemProps) {
  return (
    <div
      className={`pointer-events-none relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size, perspective: 800 }}
      aria-hidden="true"
    >
      {/* Central glowing body */}
      <div
        className="absolute rounded-full"
        style={{
          width: coreSize,
          height: coreSize,
          backgroundColor: coreColor,
          boxShadow: `0 0 24px ${coreColor}`,
          animation: 'pulse-slow 4s ease-in-out infinite',
        }}
      />

      {rings.map((ring, index) => {
        const ringSize = size * ring.scale;
        return (
          <div
            key={index}
            className="absolute"
            style={{
              width: ringSize,
              height: ringSize,
              transform: `rotate(${ring.rotation ?? 0}deg)`,
            }}
          >
            {/* rotateX lives on the PARENT so the child's spin animation
                does not override it — this is what makes the orbit elliptical */}
            <div
              className="h-full w-full"
              style={{ transform: `rotateX(${ring.tiltX ?? 70}deg)`, transformStyle: 'preserve-3d' }}
            >
              <div
                className="relative h-full w-full rounded-full border border-white/10"
                style={{
                  animation: `orbit-spin ${ring.duration}s linear infinite${ring.reverse ? ' reverse' : ''}`,
                }}
              >
                {/* Satellite pinned to the ring edge */}
                <div
                  className="absolute left-1/2 top-0 rounded-full"
                  style={{
                    width: ring.satelliteSize,
                    height: ring.satelliteSize,
                    marginLeft: -ring.satelliteSize / 2,
                    marginTop: -ring.satelliteSize / 2,
                    backgroundColor: ring.satelliteColor,
                    boxShadow: `0 0 ${ring.satelliteSize}px ${ring.satelliteColor}`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/background/CosmicBackground.tsx`**

Route-aware composition: full effects on home, interactive starfield (no comets) on portfolio, calm starfield elsewhere; 3 orbitals on home desktop, 1 everywhere (all viewports); formula texture on desktop only.

```tsx
'use client';

import { usePathname } from 'next/navigation';
import OrbitalSystem from '@/components/orbital/OrbitalSystem';
import StarfieldBackground from './StarfieldBackground';

interface BackgroundConfig {
  enableCursorInteraction: boolean;
  enableComets: boolean;
  extraOrbitals: boolean;
}

const reducedConfig: BackgroundConfig = {
  enableCursorInteraction: false,
  enableComets: false,
  extraOrbitals: false,
};

const configByPath: Record<string, BackgroundConfig> = {
  '/': { enableCursorInteraction: true, enableComets: true, extraOrbitals: true },
  '/portfolio': { enableCursorInteraction: true, enableComets: false, extraOrbitals: false },
};

const formulas = [
  { text: 'E = mc²', className: 'left-[8%] top-[18%]' },
  { text: 'Δx·Δp ≥ ℏ/2', className: 'right-[10%] top-[30%]' },
  { text: 'c ≈ 3×10⁸ m/s', className: 'left-[15%] bottom-[22%]' },
  { text: 'G = 6.674×10⁻¹¹ N·m²/kg²', className: 'right-[18%] bottom-[15%]' },
  { text: 'iℏ ∂Ψ/∂t = ĤΨ', className: 'left-[45%] top-[10%]' },
  { text: '∇·E = ρ/ε₀', className: 'right-[40%] bottom-[8%]' },
];

export default function CosmicBackground() {
  const pathname = usePathname();
  const config = configByPath[pathname] ?? reducedConfig;

  return (
    <>
      <StarfieldBackground
        enableCursorInteraction={config.enableCursorInteraction}
        enableComets={config.enableComets}
      />

      {/* One orbital on every viewport; two more on desktop home */}
      <div className="fixed -bottom-16 -left-16 -z-10" aria-hidden="true">
        <OrbitalSystem size={220} coreColor="#ff006e" className="opacity-30" />
      </div>
      {config.extraOrbitals && (
        <>
          <div className="fixed -left-24 top-24 -z-10 hidden md:block" aria-hidden="true">
            <OrbitalSystem size={280} className="opacity-50" />
          </div>
          <div className="fixed -right-32 top-1/3 -z-10 hidden md:block" aria-hidden="true">
            <OrbitalSystem size={360} coreColor="#0077b6" className="opacity-40" />
          </div>
        </>
      )}

      {/* Scientific constants texture — desktop only, ultra-subtle */}
      <div className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden lg:block" aria-hidden="true">
        {formulas.map((formula) => (
          <span
            key={formula.text}
            className={`absolute font-mono text-sm text-stellar-white opacity-[0.05] ${formula.className}`}
          >
            {formula.text}
          </span>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 3: Verify build + lint, then commit**

```bash
pnpm build && pnpm lint
```

Expected: both pass (the components are not wired into any page yet — that is Task 5; build stays green because unused files still compile).

```bash
git add src/components/orbital/OrbitalSystem.tsx src/components/background/CosmicBackground.tsx
git commit -m "feat: configurable orbital system with true ellipses + route-aware cosmic background

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Root layout, navigation, footer, motion primitives

Wires everything into the shell: Spanish `lang`, correct font variables (fixing the inverted Inter/Orbitron bug), `viewport` export (Next 16 requirement), skip link, scrollable-tab mobile nav (no hamburger), Framer Motion provider + reveal primitive, page crossfade template. Ends by stripping the per-page `MainLayout`/`StarfieldBackground` wrappers from all existing pages so the shared background is the only one mounted.

**Files:**
- Create: `src/data/navigation.ts`
- Create: `src/components/ui/MotionProvider.tsx`
- Create: `src/components/ui/Reveal.tsx`
- Create: `src/app/template.tsx`
- Modify: `src/components/layout/Navbar.tsx` (full rewrite)
- Modify: `src/components/layout/Footer.tsx` (full rewrite)
- Modify: `src/app/layout.tsx` (full rewrite)
- Modify: all 7 `src/app/**/page.tsx` (mechanical wrapper swap only — section components untouched for now)

**Interfaces:**
- Produces: `navRoutes: { href: string; label: string }[]` from `@/data/navigation` — consumed only by `Navbar`.
- Produces: `MotionProvider` (client, wraps `{children}` with `MotionConfig reducedMotion="user"`).
- Produces: `Reveal({ children, delay?, className? })` — client reveal wrapper consumed by every page section (Tasks 5–9).
- Produces: page chrome contract — every page root is `<div className="relative z-10 mx-auto max-w-* px-6 pt-28 md:pt-24 pb-16">` (clears the fixed nav: ~112 px mobile / ~96 px desktop).
- Consumes: `CosmicBackground` from Task 4; font CSS variables from Task 2's Tailwind config.

- [ ] **Step 1: Create `src/data/navigation.ts`**

```ts
export interface NavRoute {
  href: string;
  label: string;
}

export const navRoutes: NavRoute[] = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Sobre mí' },
  { href: '/portfolio', label: 'Portafolio' },
  { href: '/skills', label: 'Habilidades' },
  { href: '/experience', label: 'Experiencia' },
  { href: '/education', label: 'Educación' },
  { href: '/contact', label: 'Contacto' },
];
```

- [ ] **Step 2: Create `src/components/ui/MotionProvider.tsx`**

```tsx
'use client';

import { MotionConfig } from 'framer-motion';
import { ReactNode } from 'react';

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

- [ ] **Step 3: Create `src/components/ui/Reveal.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Create `src/app/template.tsx`** (page crossfade per spec)

```tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Rewrite `src/components/layout/Navbar.tsx`** (scrollable tabs on mobile)

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navRoutes } from '@/data/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/50 backdrop-blur-md">
      <nav aria-label="Navegación principal" className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-wider text-stellar-white transition-colors hover:text-electric-blue md:text-xl"
          >
            <span aria-hidden="true" className="text-electric-blue">✦</span> Willyb0t
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 md:flex">
            {navRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-electric-blue text-electric-blue'
                        : 'border-transparent text-stellar-white/70 hover:text-stellar-white'
                    }`}
                  >
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile: horizontally scrollable tab row (no hamburger) */}
        <ul className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-1 md:hidden">
          {navRoutes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <li key={route.href} className="shrink-0">
                <Link
                  href={route.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[48px] items-center border-b-2 px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-electric-blue text-electric-blue'
                      : 'border-transparent text-stellar-white/70 hover:text-stellar-white'
                  }`}
                >
                  {route.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 6: Rewrite `src/components/layout/Footer.tsx`** (drop dead `#` links)

```tsx
export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/[0.06] py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-stellar-white/60">
          © {new Date().getFullYear()} Willyb0t — Hecho con física y código.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 7: Rewrite `src/app/layout.tsx`**

```tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import CosmicBackground from '@/components/background/CosmicBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MotionProvider from '@/components/ui/MotionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-orbitron', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
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
      className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
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
```

- [ ] **Step 8: Strip per-page wrappers from all 7 pages**

Every page drops its own `MainLayout` and `StarfieldBackground` (now global) and uses the standard page shell. Replace each file exactly:

`src/app/page.tsx`:

```tsx
import OrbitalSystem from '@/components/orbital/OrbitalSystem';

export default function Home() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-28 md:pt-24">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="font-display text-4xl font-bold text-stellar-white">Willyb0t</h1>
        <p className="max-w-md text-base text-stellar-white/80">
          Entusiasta de la física y desarrollador full-stack
        </p>
        <OrbitalSystem size={288} className="opacity-70" />
      </div>
    </div>
  );
}
```

`src/app/about/page.tsx`:

```tsx
import BioSection from '@/components/about/BioSection';
import ExperienceSection from '@/components/about/ExperienceSection';
import SkillsSection from '@/components/about/SkillsSection';

export default function AboutPage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <BioSection />
      <ExperienceSection />
      <SkillsSection />
    </div>
  );
}
```

`src/app/portfolio/page.tsx`:

```tsx
import ProjectFilters from '@/components/project/ProjectFilters';
import ProjectGrid from '@/components/project/ProjectGrid';
import { projects } from '@/data/projects';

export default function PortfolioPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-24">
      <h1 className="mb-8 text-center font-display text-3xl font-bold text-electric-blue md:text-4xl">
        Portafolio
      </h1>
      <ProjectFilters projects={projects} />
      <ProjectGrid projects={projects} />
    </div>
  );
}
```

`src/app/skills/page.tsx`:

```tsx
import SkillsDetail from '@/components/skills/SkillsDetail';

export default function SkillsPage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <SkillsDetail />
    </div>
  );
}
```

`src/app/experience/page.tsx`:

```tsx
import ExperienceTimeline from '@/components/experience/ExperienceTimeline';

export default function ExperiencePage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <ExperienceTimeline />
    </div>
  );
}
```

`src/app/education/page.tsx`:

```tsx
import EducationSection from '@/components/education/EducationSection';

export default function EducationPage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <EducationSection />
    </div>
  );
}
```

`src/app/contact/page.tsx`:

```tsx
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <ContactForm />
    </div>
  );
}
```

- [ ] **Step 9: Verify build + lint**

```bash
pnpm build && pnpm lint
```

Expected: both pass. (Old section components still render with their English text — replaced in Tasks 6–9.)

- [ ] **Step 10: Manual check**

```bash
pnpm dev
```

- Single shared starfield on every route (no doubled canvas), nav has Spanish labels.
- At 390 px viewport: logo row + swipeable tab row, active tab underlined cyan, no hamburger.
- `Tab` from the URL bar → "Saltar al contenido" skip link appears on focus.
- Navigating between routes crossfades.

Stop the dev server.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: root layout shell with Spanish nav, motion primitives, and shared cosmic background

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: Content data + semantic Typography/Button + Home page

**Files:**
- Create: `src/data/content.ts`
- Modify: `src/components/ui/Typography.tsx` (semantic tags)
- Modify: `src/components/ui/Button.tsx` (`type` prop, palette-correct variants)
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/StatsSection.tsx`
- Create: `src/components/home/FeaturesSection.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces (from `content.ts`, consumed by Tasks 7–9 — exact export names): `hero`, `stats`, `features`, `bio`, `experienceEntries` (`ExperienceEntry[]`), `educationEntries` (`EducationEntry[]`), `skillCategories`, `contactContent`, `skillsPageContent`, `aboutPageContent`, `portfolioContent`, `experiencePageContent`, `educationPageContent`.
- Produces: `Typography({ variant?, color?, align? })` — renders semantic tags (`h1`–`h6`, `p`, `span`); also accepts standard HTML attributes like `id` and `className`. New code uses variants `h1 | h2 | h3 | body1 | caption` and colors `primary | secondary | accent`; legacy values `h4–h6 | body2 | white` exist for pre-rewrite components and are removed in Task 10.
- Produces: `Button({ variant?: 'primary'|'secondary'|'outline'; size?: 'sm'|'md'|'lg'; type?: 'button'|'submit'|'reset'; ...buttonAttributes })`.

- [ ] **Step 1: Create `src/data/content.ts`**

```ts
// ─── Home ───────────────────────────────────────────────────────────────────

export const hero = {
  name: 'Willyb0t',
  tagline: 'Entusiasta de la física y desarrollador full-stack',
  subtitle: 'Construyendo experiencias interactivas entre la ciencia y el código.',
  primaryCta: { label: 'Sobre mí', href: '/about' },
  secondaryCta: { label: 'Ver proyectos', href: '/portfolio' },
};

export const stats = [
  { value: '5+', label: 'Proyectos' },
  { value: '3', label: 'Años de experiencia' },
  { value: '10+', label: 'Tecnologías' },
  { value: '2', label: 'Publicaciones' },
];

export const features = [
  {
    title: 'Observatorio interactivo',
    description:
      'La experiencia responde a tu cursor: ondas en el campo de estrellas y cuerpos celestes en órbita que demuestran creatividad y profundidad técnica.',
  },
  {
    title: 'Rendimiento optimizado',
    description:
      'Los efectos visuales se adaptan a las capacidades del dispositivo, garantizando interacciones fluidas sin sacrificar rendimiento ni accesibilidad.',
  },
  {
    title: 'Precisión científica',
    description:
      'Cada animación e interacción se basa en principios físicos reales, desde trayectorias orbitales hasta dinámicas de partículas.',
  },
];

// ─── Sobre mí ───────────────────────────────────────────────────────────────

export const bio = {
  title: 'Sobre mí',
  paragraphs: [
    'Me apasiona la intersección entre la física y la tecnología: me especializo en crear experiencias interactivas que hacen accesibles y atractivos los conceptos complejos.',
    'Mi formación en física me da una perspectiva única para resolver problemas, combinando el pensamiento analítico con la intuición creativa en el desarrollo de software.',
    'Cuando no estoy programando, me encontrarás explorando fenómenos astronómicos, leyendo sobre mecánica cuántica o experimentando con nuevas formas de visualizar conceptos científicos.',
  ],
};

export const aboutPageContent = {
  experienceTitle: 'Experiencia profesional',
  skillsTitle: 'Habilidades técnicas',
};

// ─── Experiencia ────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  summary: string;
  achievements?: string[];
  technologies?: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  {
    period: '2023 — Actualidad',
    role: 'Desarrollador Frontend Senior',
    company: 'Tech Innovations Inc.',
    summary:
      'Lideré el desarrollo de una plataforma interactiva de visualización de datos utilizada por instituciones de investigación en todo el mundo.',
    achievements: [
      'Reduje los tiempos de carga un 65 % mediante división de código y carga diferida.',
      'Implementé funciones de colaboración en tiempo real con WebSockets.',
      'Mentoricé a 3 desarrolladores junior en buenas prácticas de React y TypeScript.',
    ],
  },
  {
    period: '2021 — 2023',
    role: 'Desarrollador Full-Stack',
    company: 'Science Labs LLC',
    summary:
      'Construí aplicaciones web para investigación científica, incluidas herramientas de simulación de partículas en tiempo real.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    period: '2019 — 2021',
    role: 'Desarrollador Junior',
    company: 'Web Solutions Agency',
    summary:
      'Desarrollé sitios y aplicaciones web responsivas para clientes de los sectores educativo y sin fines de lucro.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'WordPress'],
  },
];

export const experiencePageContent = {
  title: 'Experiencia',
  achievementsLabel: 'Logros clave:',
  technologiesLabel: 'Tecnologías:',
};

// ─── Educación ──────────────────────────────────────────────────────────────

export interface EducationEntry {
  period: string;
  degree: string;
  institution: string;
  coursework: string;
  thesis: string;
}

export const educationEntries: EducationEntry[] = [
  {
    period: '2015 — 2019',
    degree: 'Licenciatura en Física',
    institution: 'Universidad de Ciencia y Tecnología',
    coursework:
      'Mecánica clásica, electromagnetismo, mecánica cuántica, termodinámica, física matemática, programación para científicos.',
    thesis: '«Aplicaciones de la computación cuántica en sistemas criptográficos»',
  },
  {
    period: '2019 — 2021',
    degree: 'Maestría en Ciencias de la Computación',
    institution: 'Universidad de Ciencia y Tecnología',
    coursework:
      'Algoritmos avanzados, aprendizaje automático, gráficos por computadora, interacción persona-computadora, ingeniería de software.',
    thesis: '«Técnicas interactivas de visualización para datos científicos complejos»',
  },
];

export const educationPageContent = {
  title: 'Educación',
  courseworkLabel: 'Cursos relevantes:',
  thesisLabel: 'Tesis:',
};

// ─── Habilidades ────────────────────────────────────────────────────────────

export const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'CSS3', 'HTML5', 'JavaScript ES6+'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'APIs REST', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
  },
  {
    title: 'Física y Matemáticas',
    skills: ['Mecánica clásica', 'Electromagnetismo', 'Mecánica cuántica', 'Termodinámica', 'Cálculo', 'Álgebra lineal', 'Ecuaciones diferenciales'],
  },
];

export const skillsPageContent = {
  title: 'Habilidades técnicas',
  detailTitle: 'Tecnologías por proyecto',
  intro: 'Desglose de las tecnologías con las que he trabajado, según la experiencia en proyectos:',
  projectSingular: 'proyecto',
  projectPlural: 'proyectos',
};

// ─── Portafolio ─────────────────────────────────────────────────────────────

export const portfolioContent = {
  title: 'Portafolio',
  allFilter: 'Todos',
  featured: 'DESTACADO',
  github: 'GitHub',
  liveDemo: 'Demo en vivo',
};

// ─── Contacto ───────────────────────────────────────────────────────────────

export const contactContent = {
  title: 'Contacto',
  fields: {
    name: { label: 'Nombre', placeholder: 'Tu nombre' },
    email: { label: 'Correo electrónico', placeholder: 'tu.correo@ejemplo.com' },
    subject: { label: 'Asunto', placeholder: 'Asunto de tu mensaje' },
    message: { label: 'Mensaje', placeholder: 'Escribe tu mensaje aquí…' },
  },
  submit: 'Enviar mensaje',
  sending: 'Enviando…',
  success: '¡Mensaje enviado con éxito! Te responderé pronto.',
  error: 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.',
};
```

- [ ] **Step 2: Rewrite `src/components/ui/Typography.tsx`** (semantic tags)

NOTE: the variant/color unions below include the legacy values (`h4–h6`, `body2`, `white`) that the OLD section components still use — mapped onto the new 3-size scale so everything compiles and stays within the font-size rule. New code (Tasks 6–9) uses only `h1 | h2 | h3 | body1 | caption` and `primary | secondary | accent`. Task 10 removes the legacy values once no consumer uses them.

```tsx
import { createElement, type HTMLAttributes, type ReactNode } from 'react';

// Legacy variants (h4–h6, body2) and color (white) exist only for
// pre-rewrite components; they are removed in Task 10.
type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
type TypographyColor = 'primary' | 'secondary' | 'accent' | 'white';
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
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
} as const;

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'font-display text-3xl md:text-4xl font-bold',
  h2: 'font-display text-xl md:text-2xl font-semibold',
  h3: 'text-base font-semibold',
  h4: 'text-base font-semibold',
  h5: 'text-base font-semibold',
  h6: 'text-base font-semibold',
  body1: 'text-base',
  body2: 'text-base',
  caption: 'text-xs',
};

const colorClasses: Record<TypographyColor, string> = {
  primary: 'text-stellar-white',
  secondary: 'text-stellar-white/70',
  accent: 'text-electric-blue',
  white: 'text-stellar-white',
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
```

- [ ] **Step 3: Rewrite `src/components/ui/Button.tsx`**

Drops the unused `href`/`asChild` modes (home CTAs are styled `Link`s), adds `type`, uses palette-correct hovers (old code used off-palette `bg-blue-600`/`bg-purple-600`):

```tsx
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const baseClasses =
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-space-black disabled:pointer-events-none disabled:opacity-50';

const variantClasses = {
  primary: 'bg-electric-blue text-white hover:bg-electric-blue/80',
  secondary: 'bg-vibrant-purple text-white hover:bg-vibrant-purple/80',
  outline: 'border border-electric-blue text-electric-blue hover:bg-electric-blue/10',
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
```

- [ ] **Step 4: Create `src/components/home/HeroSection.tsx`**

```tsx
import Link from 'next/link';
import OrbitalSystem from '@/components/orbital/OrbitalSystem';
import Reveal from '@/components/ui/Reveal';
import { hero } from '@/data/content';

const primaryCtaClasses =
  'rounded-lg bg-electric-blue px-6 py-3 text-base font-medium text-white transition-colors hover:bg-electric-blue/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-space-black';

const secondaryCtaClasses =
  'rounded-lg border border-electric-blue px-6 py-3 text-base font-medium text-electric-blue transition-colors hover:bg-electric-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-space-black';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center">
      <Reveal>
        <h1 className="font-display text-4xl font-bold tracking-wider text-stellar-white md:text-6xl">
          {hero.name}
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-xl text-base text-stellar-white/80">
          {hero.tagline}
          <br />
          <span className="text-electric-blue">{hero.subtitle}</span>
        </p>
      </Reveal>
      <Reveal delay={0.2} className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href={hero.primaryCta.href} className={primaryCtaClasses}>
          {hero.primaryCta.label}
        </Link>
        <Link href={hero.secondaryCta.href} className={secondaryCtaClasses}>
          {hero.secondaryCta.label}
        </Link>
      </Reveal>
      <Reveal delay={0.3} className="mt-14">
        <OrbitalSystem size={288} className="opacity-70" />
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 5: Create `src/components/home/StatsSection.tsx`**

```tsx
import Reveal from '@/components/ui/Reveal';
import { stats } from '@/data/content';

export default function StatsSection() {
  return (
    <section aria-label="Estadísticas" className="mt-16 w-full max-w-4xl">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1} className="text-center">
            <p className="font-display text-xl font-bold text-electric-blue md:text-2xl">{stat.value}</p>
            <p className="mt-1 text-base uppercase tracking-wider text-stellar-white/70">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create `src/components/home/FeaturesSection.tsx`**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import Reveal from '@/components/ui/Reveal';
import { features } from '@/data/content';

export default function FeaturesSection() {
  return (
    <section className="mt-16 grid w-full max-w-6xl gap-6 md:grid-cols-3">
      {features.map((feature, index) => (
        <Reveal key={feature.title} delay={index * 0.12} className="h-full">
          <GlassmorphismCard className="h-full p-6">
            <h2 className="font-display text-xl font-semibold text-electric-blue md:text-2xl">
              {feature.title}
            </h2>
            <p className="mt-3 text-base text-stellar-white/85">{feature.description}</p>
          </GlassmorphismCard>
        </Reveal>
      ))}
    </section>
  );
}
```

- [ ] **Step 7: Rewrite `src/app/page.tsx`**

```tsx
import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';

export default function HomePage() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-28 md:pt-24">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </div>
  );
}
```

- [ ] **Step 8: Verify build + lint**

```bash
pnpm build && pnpm lint
```

Expected: both pass — the old section components keep compiling because `Typography` still accepts the legacy variants/colors (removed in Task 10 after Tasks 7–9 rewrite their consumers).

- [ ] **Step 9: Manual check + commit**

```bash
pnpm dev
```

Home: hero name in large Orbitron, Spanish tagline, two CTAs (Sobre mí / Ver proyectos), orbital centerpiece with glowing core and 3 elliptical rings, stats row, 3 glass feature cards; scroll reveals stagger in. Stop the dev server.

```bash
git add -A
git commit -m "feat: content data layer, semantic typography, and home page sections

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: About + Skills pages (data-driven, Spanish)

**Files:**
- Modify: `src/components/about/BioSection.tsx`
- Modify: `src/components/about/ExperienceSection.tsx`
- Modify: `src/components/about/SkillsSection.tsx`
- Modify: `src/components/skills/SkillsDetail.tsx`
- Modify: `src/app/about/page.tsx` (add metadata)
- Modify: `src/app/skills/page.tsx` (add metadata)

**Interfaces:**
- Consumes: `bio`, `aboutPageContent`, `experienceEntries`, `skillCategories`, `skillsPageContent` from `@/data/content` (Task 6); `Typography` with variants `h1|h2|h3|body1|caption` and colors `primary|secondary|accent` (Task 6); `Reveal` (Task 5); `GlassmorphismCard` (Task 1); `projects` from `@/data/projects`.

- [ ] **Step 1: Rewrite `src/components/about/BioSection.tsx`**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { bio } from '@/data/content';

export default function BioSection() {
  return (
    <section aria-labelledby="bio-title" className="mb-16">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-8" id="bio-title">
          {bio.title}
        </Typography>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          {bio.paragraphs.map((paragraph) => (
            <Typography key={paragraph.slice(0, 32)} variant="body1" className="mt-4 leading-relaxed text-stellar-white/90 first:mt-0">
              {paragraph}
            </Typography>
          ))}
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/about/ExperienceSection.tsx`**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { aboutPageContent, experienceEntries } from '@/data/content';

export default function ExperienceSection() {
  return (
    <section aria-labelledby="about-experience-title" className="mb-16">
      <Reveal>
        <Typography variant="h2" color="accent" align="center" className="mb-8" id="about-experience-title">
          {aboutPageContent.experienceTitle}
        </Typography>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          <div className="space-y-8">
            {experienceEntries.map((entry) => (
              <article key={entry.period} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <Typography variant="body1" color="accent" className="font-semibold">
                  {entry.period}
                </Typography>
                <div>
                  <Typography variant="h3">{entry.role}</Typography>
                  <Typography variant="body1" color="secondary">
                    {entry.company}
                  </Typography>
                  <Typography variant="body1" className="mt-2 text-stellar-white/85">
                    {entry.summary}
                  </Typography>
                </div>
              </article>
            ))}
          </div>
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/about/SkillsSection.tsx`**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { aboutPageContent, skillCategories } from '@/data/content';

export default function SkillsSection() {
  return (
    <section aria-labelledby="about-skills-title">
      <Reveal>
        <Typography variant="h2" color="accent" align="center" className="mb-8" id="about-skills-title">
          {aboutPageContent.skillsTitle}
        </Typography>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-3">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <Typography variant="h3" color="accent" align="center" className="mb-3">
                  {category.title}
                </Typography>
                <ul className="flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-stellar-white/85"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 4: Rewrite `src/components/skills/SkillsDetail.tsx`** (adds usage bars)

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { skillsPageContent } from '@/data/content';
import { projects } from '@/data/projects';

export default function SkillsDetail() {
  const techCounts: Record<string, number> = {};
  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;
    });
  });

  const sortedTech = Object.entries(techCounts).sort(([, a], [, b]) => b - a);
  const maxCount = sortedTech[0]?.[1] ?? 1;

  return (
    <section aria-labelledby="skills-title" className="mx-auto max-w-4xl">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-4" id="skills-title">
          {skillsPageContent.title}
        </Typography>
        <Typography variant="body1" color="secondary" align="center" className="mb-8">
          {skillsPageContent.intro}
        </Typography>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          <Typography variant="h2" className="mb-6">
            {skillsPageContent.detailTitle}
          </Typography>
          <ul className="space-y-4">
            {sortedTech.map(([tech, count]) => (
              <li key={tech}>
                <div className="flex items-center justify-between gap-4">
                  <Typography variant="body1">{tech}</Typography>
                  <Typography variant="body1" color="accent">
                    {count} {count === 1 ? skillsPageContent.projectSingular : skillsPageContent.projectPlural}
                  </Typography>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-electric-blue"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 5: Add metadata to `src/app/about/page.tsx`**

Add this export right after the imports (component unchanged):

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre mí — Willyb0t',
  description: 'Biografía, experiencia profesional y habilidades técnicas de Willyb0t.',
};
```

- [ ] **Step 6: Add metadata to `src/app/skills/page.tsx`**

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Habilidades — Willyb0t',
  description: 'Tecnologías y habilidades técnicas de Willyb0t según su experiencia en proyectos.',
};
```

- [ ] **Step 7: Verify + commit**

```bash
pnpm build && pnpm lint
```

Expected: pass (remaining failures only in old experience/education/contact/portfolio sections — Tasks 8–9).

Manual: `pnpm dev` → `/about` shows bio card, experience entries (period left, role/company/summary right), 3 skill categories with chips; `/skills` shows the technology list with proportional bars. Stop the dev server.

```bash
git add -A
git commit -m "feat: data-driven about and skills pages in Spanish

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 8: Portfolio page — working filters, fixed grid, cosmic project cards

**Files:**
- Modify: `src/data/projects.ts` (Spanish descriptions; names/URLs untouched)
- Create: `src/components/project/PortfolioClient.tsx`
- Modify: `src/components/project/ProjectFilters.tsx` (controlled)
- Modify: `src/components/project/ProjectGrid.tsx` (fixed grid classes)
- Modify: `src/components/project/ProjectCard.tsx` (cosmic placeholder, contrast-safe badge)
- Modify: `src/app/portfolio/page.tsx`

**Interfaces:**
- Consumes: `portfolioContent` from `@/data/content`; `Typography`, `Button` (Task 6); `Reveal` (Task 5); `GlassmorphismCard` (Task 1).
- Produces: `PortfolioClient({ projects: Project[] })` — client boundary holding filter state.

- [ ] **Step 1: Rewrite `src/data/projects.ts`** (descriptions → Spanish)

```ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'voc-from-social-media',
    title: 'VOC Analysis from Social Media',
    description:
      'Sistema de procesamiento de lenguaje natural que analiza datos de emisiones de compuestos orgánicos volátiles (VOC) extraídos de publicaciones en redes sociales para identificar tendencias ambientales y fuentes de contaminación en tiempo real.',
    image: '/images/voc-social-media.jpg',
    technologies: ['Python', 'NLTK', 'Pandas', 'Scikit-learn', 'React', 'Chart.js', 'API Integration'],
    githubUrl: 'https://github.com/Willyb0t/voc_from_social_media',
    liveUrl: 'https://voc-social-media.willyb0t.dev',
    featured: true,
  },
  {
    id: 'qkd-simulation',
    title: 'Quantum Key Distribution Simulation',
    description:
      'Simulación interactiva de mecánica cuántica que demuestra los principios de los protocolos de distribución cuántica de claves (QKD), incluidos BB84 y E91, con visualizaciones de estados cuánticos, entrelazamiento y generación segura de claves.',
    image: '/images/qkd-simulation.jpg',
    technologies: ['React', 'Three.js', 'TypeScript', 'CSS3', 'WebGL', 'Quantum Computing Concepts'],
    githubUrl: 'https://github.com/Willyb0t/qkd_simulation',
    liveUrl: 'https://qkd-simulation.willyb0t.dev',
    featured: true,
  },
  {
    id: 'telegraph-trough-internet',
    title: 'Telegraph Protocol Over Internet',
    description:
      'Implementación moderna de protocolos de comunicación telegráfica adaptados a la transmisión por internet, que combina métodos históricos de comunicación con tecnología de redes contemporánea para crear un sistema de mensajería resiliente de bajo ancho de banda.',
    image: '/images/telegraph-internet.jpg',
    technologies: ['Node.js', 'Socket.io', 'Python', 'Serial Communication', 'TCP/IP Protocols', 'React'],
    githubUrl: 'https://github.com/Willyb0t/telegraph_trough_internet',
    liveUrl: 'https://telegraph-internet.willyb0t.dev',
    featured: false,
  },
  {
    id: 'lora-tracker',
    title: 'LoRaWAN Asset Tracking System',
    description:
      'Sistema de rastreo de activos inalámbrico de largo alcance y bajo consumo que utiliza tecnología LoRaWAN para monitorear activos en entornos remotos o difíciles, con seguimiento de ubicación en tiempo real, geocercas y operación energéticamente eficiente.',
    image: '/images/lora-tracker.jpg',
    technologies: ['C/C++', 'Python', 'LoRaWAN', 'MQTT', 'PostgreSQL', 'React Native', 'AWS IoT'],
    githubUrl: 'https://github.com/Willyb0t/LORA-tracker',
    liveUrl: 'https://lora-tracker.willyb0t.dev',
    featured: true,
  },
  {
    id: 'elt-sap-b1-pipeline',
    title: 'ELT Pipeline for SAP B1 Data',
    description:
      'Pipeline ELT (Extract, Load, Transform) de nivel empresarial que extrae datos de SAP Business One, los procesa con dbt y los carga en un almacén de datos PostgreSQL para su visualización en Power BI, habilitando inteligencia de negocio integral.',
    image: '/images/elt-sap-b1.jpg',
    technologies: ['Python', 'Apache Airflow', 'dbt', 'PostgreSQL', 'Power BI', 'SAP B1 API', 'Docker', 'SQL'],
    githubUrl: 'https://github.com/Willyb0t/elt-sap-b1-pipeline',
    liveUrl: 'https://elt-sap-b1.willyb0t.dev',
    featured: true,
  },
];
```

- [ ] **Step 2: Create `src/components/project/PortfolioClient.tsx`** (lifts filter state)

```tsx
'use client';

import { useMemo, useState } from 'react';
import ProjectFilters from './ProjectFilters';
import ProjectGrid from './ProjectGrid';
import { portfolioContent } from '@/data/content';
import { Project } from '@/data/projects';

interface PortfolioClientProps {
  projects: Project[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>(portfolioContent.allFilter);

  const filters = useMemo(() => {
    const allTechnologies = Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();
    return [portfolioContent.allFilter, ...allTechnologies];
  }, [projects]);

  const filteredProjects = useMemo(
    () =>
      selectedFilter === portfolioContent.allFilter
        ? projects
        : projects.filter((p) => p.technologies.includes(selectedFilter)),
    [projects, selectedFilter]
  );

  return (
    <>
      <ProjectFilters filters={filters} selected={selectedFilter} onSelect={setSelectedFilter} />
      <ProjectGrid projects={filteredProjects} />
    </>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/project/ProjectFilters.tsx`** (controlled, presentational)

```tsx
import { Button } from '@/components/ui/Button';

interface ProjectFiltersProps {
  filters: string[];
  selected: string;
  onSelect: (filter: string) => void;
}

export default function ProjectFilters({ filters, selected, onSelect }: ProjectFiltersProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar proyectos por tecnología">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selected === filter ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onSelect(filter)}
          aria-pressed={selected === filter}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Rewrite `src/components/project/ProjectGrid.tsx`** (fixed grid)

```tsx
import ProjectCard from '@/components/project/ProjectCard';
import Reveal from '@/components/ui/Reveal';
import { Project } from '@/data/projects';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <li key={project.id} className="h-full">
          <Reveal delay={(index % 3) * 0.1} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 5: Rewrite `src/components/project/ProjectCard.tsx`**

Cosmic placeholder instead of the gray "Image Preview" box (no stock images, per `claude.md`); featured badge uses `cosmic-pink` because `vibrant-purple` (#0077b6) text on a dark card fails contrast:

```tsx
import Link from 'next/link';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { portfolioContent } from '@/data/content';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassmorphismCard className="flex h-full flex-col p-5">
      {project.featured && (
        <span className="absolute right-3 top-3 z-10 rounded bg-cosmic-pink/20 px-2 py-1 text-xs font-semibold text-cosmic-pink">
          {portfolioContent.featured}
        </span>
      )}

      {/* Cosmic placeholder (real screenshots can replace this later) */}
      <div
        aria-hidden="true"
        className="relative mb-4 h-36 overflow-hidden rounded-lg border border-white/[0.06] bg-gradient-to-br from-space-blue via-space-black to-vibrant-purple/30"
      >
        <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold text-white/[0.07]">
          {project.title.charAt(0)}
        </span>
        <span className="absolute left-3 top-2 h-1 w-1 rounded-full bg-stellar-white/40" />
        <span className="absolute bottom-3 left-1/3 h-0.5 w-0.5 rounded-full bg-stellar-white/30" />
        <span className="absolute bottom-6 right-4 h-1.5 w-1.5 rounded-full bg-electric-blue/40" />
        <span className="absolute right-3 top-3 text-electric-blue/50">✦</span>
      </div>

      <Typography variant="h2" className="mb-2">
        {project.title}
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-4 flex-1">
        {project.description}
      </Typography>

      <ul className="mb-4 flex flex-wrap gap-2" aria-label="Tecnologías">
        {project.technologies.map((tech) => (
          <li key={tech} className="rounded bg-white/5 px-2 py-1 text-xs text-stellar-white/80">
            {tech}
          </li>
        ))}
      </ul>

      <div className="flex gap-4">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-electric-blue transition-colors hover:text-stellar-white"
          >
            {portfolioContent.github}
          </Link>
        )}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-electric-blue transition-colors hover:text-stellar-white"
          >
            {portfolioContent.liveDemo}
          </Link>
        )}
      </div>
    </GlassmorphismCard>
  );
}
```

- [ ] **Step 6: Rewrite `src/app/portfolio/page.tsx`**

```tsx
import type { Metadata } from 'next';
import PortfolioClient from '@/components/project/PortfolioClient';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { portfolioContent } from '@/data/content';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Portafolio — Willyb0t',
  description: 'Proyectos de Willyb0t: simulación cuántica, pipelines de datos, IoT y más.',
};

export default function PortfolioPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-24">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-8">
          {portfolioContent.title}
        </Typography>
      </Reveal>
      <PortfolioClient projects={projects} />
    </div>
  );
}
```

- [ ] **Step 7: Verify + commit**

```bash
pnpm build && pnpm lint
```

Expected: pass.

Manual: `pnpm dev` → `/portfolio` shows a 3-column card grid (desktop) with cosmic placeholders and DESTACADO badges; clicking a technology filter chip instantly filters the grid; "Todos" restores all 5 projects. Stop the dev server.

```bash
git add -A
git commit -m "feat: portfolio page with working filters, fixed grid, and cosmic project cards

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 9: Experience, Education, Contact pages

**Files:**
- Modify: `src/components/experience/ExperienceTimeline.tsx` (timeline layout)
- Modify: `src/components/education/EducationSection.tsx`
- Modify: `src/components/contact/ContactForm.tsx`
- Modify: `src/app/experience/page.tsx`, `src/app/education/page.tsx`, `src/app/contact/page.tsx` (metadata)

**Interfaces:**
- Consumes: `experienceEntries`, `experiencePageContent`, `educationEntries`, `educationPageContent`, `contactContent` from `@/data/content` (Task 6); `Typography`, `Button` (Task 6); `Reveal` (Task 5); `GlassmorphismCard` (Task 1).

- [ ] **Step 1: Rewrite `src/components/experience/ExperienceTimeline.tsx`**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { experienceEntries, experiencePageContent } from '@/data/content';

export default function ExperienceTimeline() {
  return (
    <section aria-labelledby="experience-title" className="mx-auto max-w-4xl">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-12" id="experience-title">
          {experiencePageContent.title}
        </Typography>
      </Reveal>
      <ol className="relative space-y-10 border-l-2 border-white/10 pl-8">
        {experienceEntries.map((entry, index) => (
          <li key={entry.period} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-electric-blue bg-space-black shadow-[0_0_12px_#00b4d8]"
            />
            <Reveal delay={index * 0.1}>
              <GlassmorphismCard className="p-6">
                <Typography variant="body1" color="accent" className="font-semibold">
                  {entry.period}
                </Typography>
                <Typography variant="h2" className="mt-1">
                  {entry.role}
                </Typography>
                <Typography variant="body1" color="secondary">
                  {entry.company}
                </Typography>
                <Typography variant="body1" className="mt-3 text-stellar-white/85">
                  {entry.summary}
                </Typography>
                {entry.achievements && (
                  <>
                    <Typography variant="body1" className="mt-4 font-semibold">
                      {experiencePageContent.achievementsLabel}
                    </Typography>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-stellar-white/85">
                      {entry.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </>
                )}
                {entry.technologies && (
                  <>
                    <Typography variant="body1" className="mt-4 font-semibold">
                      {experiencePageContent.technologiesLabel}
                    </Typography>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {entry.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-stellar-white/85"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </GlassmorphismCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/education/EducationSection.tsx`**

```tsx
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { educationEntries, educationPageContent } from '@/data/content';

export default function EducationSection() {
  return (
    <section aria-labelledby="education-title" className="mx-auto max-w-4xl">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-12" id="education-title">
          {educationPageContent.title}
        </Typography>
      </Reveal>
      <div className="space-y-6">
        {educationEntries.map((entry, index) => (
          <Reveal key={entry.degree} delay={index * 0.1}>
            <GlassmorphismCard className="p-6 md:p-8">
              <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <Typography variant="body1" color="accent" className="font-semibold">
                  {entry.period}
                </Typography>
                <div>
                  <Typography variant="h2">{entry.degree}</Typography>
                  <Typography variant="body1" color="secondary">
                    {entry.institution}
                  </Typography>
                  <Typography variant="body1" className="mt-3 font-semibold">
                    {educationPageContent.courseworkLabel}
                  </Typography>
                  <Typography variant="body1" className="text-stellar-white/85">
                    {entry.coursework}
                  </Typography>
                  <Typography variant="body1" className="mt-3 font-semibold">
                    {educationPageContent.thesisLabel}
                  </Typography>
                  <Typography variant="body1" className="text-stellar-white/85">
                    {entry.thesis}
                  </Typography>
                </div>
              </div>
            </GlassmorphismCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/contact/ContactForm.tsx`**

```tsx
'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { contactContent } from '@/data/content';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: FormState = { name: '', email: '', subject: '', message: '' };

const inputClasses =
  'w-full rounded-lg border border-gray-600/30 bg-gray-800/20 px-4 py-3 text-base text-white placeholder:text-stellar-white/40 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-electric-blue';

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulated send (no backend in scope)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus({ type: 'success', message: contactContent.success });
      setFormState(initialFormState);
    } catch {
      setSubmitStatus({ type: 'error', message: contactContent.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="contact-title" className="mx-auto max-w-4xl">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-8" id="contact-title">
          {contactContent.title}
        </Typography>
      </Reveal>

      {submitStatus && (
        <div
          role="status"
          className={`mb-6 rounded-lg border p-4 ${
            submitStatus.type === 'success'
              ? 'border-green-500/30 bg-green-500/20 text-green-400'
              : 'border-red-500/30 bg-red-500/20 text-red-400'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-base text-stellar-white">
                {contactContent.fields.name.label}
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={inputClasses}
                placeholder={contactContent.fields.name.placeholder}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-base text-stellar-white">
                {contactContent.fields.email.label}
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={inputClasses}
                placeholder={contactContent.fields.email.placeholder}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-subject" className="mb-2 block text-base text-stellar-white">
                {contactContent.fields.subject.label}
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className={inputClasses}
                placeholder={contactContent.fields.subject.placeholder}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-base text-stellar-white">
                {contactContent.fields.message.label}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                className={inputClasses}
                rows={6}
                placeholder={contactContent.fields.message.placeholder}
                required
              />
            </div>
            <div className="flex justify-center pt-2">
              <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                {isSubmitting ? contactContent.sending : contactContent.submit}
              </Button>
            </div>
          </form>
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 4: Add metadata to the three page files**

`src/app/experience/page.tsx` — add after imports:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiencia — Willyb0t',
  description: 'Trayectoria profesional de Willyb0t como desarrollador.',
};
```

`src/app/education/page.tsx` — add after imports:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Educación — Willyb0t',
  description: 'Formación académica de Willyb0t en física y ciencias de la computación.',
};
```

`src/app/contact/page.tsx` — add after imports:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto — Willyb0t',
  description: 'Ponte en contacto con Willyb0t para proyectos y colaboraciones.',
};
```

- [ ] **Step 5: Verify + commit**

```bash
pnpm build && pnpm lint
```

Expected: **both fully green across the whole project** (this is the first task where no legacy component remains broken).

Manual: `pnpm dev` → `/experience` shows a glowing-node timeline; `/education` shows both degrees with coursework and thesis; `/contact` — submit the form: button shows "Enviando…", then the green success banner appears and the form resets. Stop the dev server.

```bash
git add -A
git commit -m "feat: experience timeline, education, and contact pages in Spanish

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 10: Final polish — dead code removal + docs + full verification

**Files:**
- Delete: `src/components/layout/MainLayout.tsx` (no longer imported anywhere)
- Modify: `README.md`
- Modify: `claude.md`

- [ ] **Step 1: Delete `MainLayout.tsx` and verify nothing references it**

```bash
grep -rn "MainLayout" src/ || echo "no references"
rm src/components/layout/MainLayout.tsx
```

Expected: grep prints "no references" before deletion. If anything references it, stop and fix the reference first.

- [ ] **Step 2: Slim `Typography` to its final API**

Verify no consumer still uses the legacy values, then remove them:

```bash
grep -rn 'variant="h[456]"\|variant="body2"\|color="white"' src/ || echo "no legacy usage"
```

Expected: "no legacy usage". Then in `src/components/ui/Typography.tsx`:

- Narrow the unions to `type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'caption';` and `type TypographyColor = 'primary' | 'secondary' | 'accent';`
- Delete the `h4`, `h5`, `h6`, `body2` entries from `variantTags` and `variantClasses`, and the `white` entry from `colorClasses`.
- Delete the "Legacy variants" comment.

- [ ] **Step 3: Update `README.md`**

Replace the Tech Stack section (and Next.js 14 mention in the intro) with:

```markdown
A modern, interactive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. Features an immersive space/observatory theme with interactive starfield, orbital systems, and smooth animations. UI in Spanish.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v3.4
- **Animations**: Framer Motion, CSS animations, canvas (requestAnimationFrame)
- **Package manager**: pnpm
- **Fonts**: Google Fonts via next/font (Orbitron, Inter, Space Grotesk, JetBrains Mono)
```

Also replace `npm install` / `npm run dev` / `npm run build` / `npm start` commands in Getting Started and Building for Production with `pnpm install` / `pnpm dev` / `pnpm build` / `pnpm start`.

- [ ] **Step 4: Update `claude.md` tech stack lines**

```markdown
## Tech Stack
- Framework: Next.js 16 with App Router
- Styling: Tailwind CSS v3.4
- Animations: Framer Motion + canvas (requestAnimationFrame)
- Package manager: pnpm
- Deployment: Vercel
- UI language: Spanish (all copy lives in src/data/)
```

- [ ] **Step 5: Full verification sweep**

```bash
pnpm build && pnpm lint
```

Expected: green.

```bash
pnpm dev
```

Manual sweep at 390 px, 768 px, and 1440 px across all 7 routes:
- [ ] No horizontal scroll anywhere.
- [ ] Home: interactive starfield + comets, 4 orbitals (3 background desktop + 1 hero), reveals stagger.
- [ ] All nav labels and page content in Spanish; active tab underlined on both nav variants.
- [ ] Portfolio filters actually filter; grid shows 1/2/3 columns by breakpoint.
- [ ] Contact form: labels tied to inputs, submit shows "Enviando…" then success banner.
- [ ] Keyboard-only: skip link appears first, all links/buttons reachable with visible focus rings.
- [ ] DevTools `prefers-reduced-motion: reduce`: static starfield, no reveals/orbit motion.

Stop the dev server.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: remove dead layout component and update docs for Next 16 rewrite

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Post-implementation

After Task 10, run a finishing pass per the executing skill: verify all checkboxes, confirm the working tree is clean, and summarize what changed for the user. The user will replace the placeholder copy in `src/data/content.ts` and `src/data/projects.ts` with their real info.
