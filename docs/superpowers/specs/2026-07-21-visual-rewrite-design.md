# Portfolio Visual Rewrite — Design Specification

**Date**: 2026-07-21
**Project**: Willyb0t Portfolio
**Approach**: A — Faithful restoration of the 2026-06-04 visual spec, modernized for Next.js 16
**Supersedes**: `2026-06-04-portfolio-design.md` (visual direction preserved; implementation details updated)

## Goal

Rewrite the codebase so every visual element described in the original design spec actually works: interactive canvas starfield with cursor wake and physically-correct comets, reliable CSS orbital systems, refined glassmorphism, scroll reveals, and a no-hamburger mobile navigation. All UI text in **Spanish**. Content structure is preserved — the user will replace copy with final info afterward, so all text must be trivially editable in centralized data files.

## Locked Decisions

| Decision | Choice | Source |
|---|---|---|
| UI language | Spanish (all labels, headings, form text, aria-labels) | User, 2026-07-21 |
| Animation stack | Framer Motion v12 (React 19 compatible) + CSS + canvas rAF | User, 2026-07-21 |
| Mobile nav | Scrollable top tab row (no hamburger, per `claude.md`) | User, 2026-07-21 |
| Routes | Keep English paths (`/about`, `/portfolio`, `/skills`, `/experience`, `/education`, `/contact`); Spanish labels | Design confirmation |
| Content | Keep all existing sections & project data; translate UI chrome + descriptions to Spanish; repo names/URLs untouched | User request |

## Tech Stack (post-rewrite)

- **Framework**: Next.js 16.2.7 (App Router, Turbopack default), React 19.2.4
- **Language**: TypeScript strict mode
- **Styling**: Tailwind CSS **v3.4** (pinned in `claude.md`; Next 16 supports it via the legacy PostCSS plugin)
- **Animations**: `framer-motion@^12` (new dep), CSS animations, canvas `requestAnimationFrame`
- **Package manager**: pnpm (existing `node_modules` is pnpm-managed)
- **Fonts**: `next/font/google` — Orbitron, Inter, Space Grotesk, JetBrains Mono with CSS variables

## Phase 0 — Cleanup (prerequisite)

The repo currently has conflicting/deprecated config that must be resolved first:

1. **Delete `next.config.js`** — keep `next.config.ts`; remove deprecated `images.domains` (Next 16: use `remotePatterns`, empty here); keep `formats: ['image/avif', 'image/webp']`.
2. **Delete `postcss.config.mjs`** (references v4 plugin `@tailwindcss/postcss`) — keep `postcss.config.js` with v3 plugins (`tailwindcss`, `autoprefixer`).
3. **Delete `package-lock.json`** — pnpm is the package manager (`pnpm-lock.yaml`, `pnpm-workspace.yaml` stay).
4. **package.json scripts**: replace `"lint": "next lint"` (removed in Next 16) with `"lint": "eslint"`; remove `"test": "jest"` / `"test:watch"` (no jest installed); add `framer-motion` dependency.
5. **`globals.css`**: remove duplicated `body` rules (currently declared twice, one outside `@layer`).

## Visual System

### Palette (unchanged from spec, as Tailwind colors)

| Token | Value | Use |
|---|---|---|
| `space-black` | `#000000` | base background |
| `space-blue` | `#000816` | deep space gradient/background |
| `electric-blue` | `#00b4d8` | primary accent, active states, links |
| `vibrant-purple` | `#0077b6` | secondary accent |
| `cosmic-pink` | `#ff006e` | tertiary accent |
| `stellar-white` | `#f8f9fa` | primary text |
| `space-gray` | `#f0f0f0` | secondary text |

### Typography

- **Orbitron** (`--font-orbitron`): headings, numerals/stat values. Weights 400/700.
- **Inter** (`--font-inter`): body text (variable font).
- **Space Grotesk** (`--font-space-grotesk`): secondary headings/accents.
- **JetBrains Mono** (`--font-jetbrains-mono`): code snippets, technical labels.
- Loaded via `next/font/google` with CSS variables on `<html>`; applied through Tailwind `fontFamily` theme keys.
- **Constraint** (`claude.md`): max 3 font sizes per page. Scale: page title (`text-3xl md:text-4xl`), section title/card heading (`text-xl md:text-2xl`), body (`text-base`). Hero on home may use one display size (`text-4xl md:text-6xl`) as its third size.

### Glassmorphism (exact spec values)

- Base: `background: rgba(0,0,0,0.2)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 1rem`.
- Hover: `background: rgba(0,0,0,0.3)`, `transform: translateY(-4px)`, `box-shadow: 0 8px 24px rgba(0,0,0,0.3)`, transition 300ms ease-out.
- Implemented as Tailwind utilities in `GlassmorphismCard`; **fix export to named `GlassmorphismCard`** (currently default export imported as named — broken).

### Semantic Typography component

`Typography` maps variants to real tags (`h1`→`<h1>`, …, `body1`→`<p>`, `caption`→`<span>`) instead of always rendering `<div>`. Fixes heading hierarchy, SEO, and screen-reader navigation. Color/align props preserved.

## Background Effects — `CosmicBackground`

One client component mounted once in the root layout, behind all content (`fixed inset-0 -z-10`, `aria-hidden`, `pointer-events-none`). Composes three layers. Per-page intensity via a small config map keyed by pathname (home = full; subpages = reduced).

### Layer 1 — StarfieldBackground (canvas, rewrite of existing)

Keep the canvas approach; fix and complete it:

- **Props** (pages/layout already pass these — currently rejected): `starCount?`, `enableCursorInteraction?`, `enableComets?`, `className?`.
- **Stars**: responsive density — 100 desktop (>1024px), 75 tablet (768–1024), 50 mobile (<768px) unless overridden by `starCount`. Size 0.5–2px, twinkle via oscillating opacity (0.2–1.0 range, per-star speed).
- **Cursor interaction** (`enableCursorInteraction`): stars within 120px radius repel from cursor (wake effect, force ∝ proximity), spring-return to base position (lerp 0.02/frame), subtle brightness boost near cursor. Touch: uses `touchmove` position; no interaction when pointer leaves window.
- **Comets** (`enableComets`, spec-exact):
  - Spawn at **any** screen edge with velocity aimed across the viewport.
  - Tail points **opposite the velocity vector**; gradient from opaque white head to transparent tail; `lineCap: round`.
  - Variable length (40–100px), speed, opacity.
  - Max 3 simultaneous desktop, spawn chance 0.5–2% per frame (0.5% baseline); mobile: frequency × 0.25.
  - Removed when fully outside a 100px boundary margin.
- **Correctness fixes vs current code**:
  - Named handler functions so `removeEventListener` actually detaches (current code passes new anonymous functions — leak).
  - HiDPI: scale canvas by `devicePixelRatio` for crisp rendering.
  - Pause rAF loop on `document.visibilitychange` hidden; resume on visible.
  - `prefers-reduced-motion`: render a static starfield (stars drawn once, no twinkle/comets/cursor), no animation loop.
  - Resize: debounced re-init preserving star field distribution.

### Layer 2 — OrbitalSystem (CSS 3D, generalize existing)

Current `rotateX`-ellipse technique works; make it a configurable pure-CSS component (zero JS runtime cost):

- **Props**: `size` (px), `tilt` (deg, default −12), `speeds` per ring, `satellites` (array of `{ color, size }`, 1–3 rings), `className` for positioning.
- Render: central glowing body (`bg` + `box-shadow` glow, `pulse-slow`), 1–3 rings (`border border-white/10 rounded-full`, `transform: rotateX(65–75deg)`, `animate-[spin_Ns_linear_infinite[_reverse]]`), one satellite dot per ring pinned to the ring edge with matching glow.
- Layout renders **2–3 instances** as fixed background decorations on desktop (positioned away from content zones: e.g. top-left, right-mid, bottom-left), **1 instance** on mobile via `hidden md:block` on secondary instances.
- Respects reduced motion (animations disabled globally under `prefers-reduced-motion`).

### Layer 3 — Scientific texture

- Faint formula fragments (`c = 3×10⁸ m/s`, `G`, `ℏ`, `E = mc²`, `ΔxΔp ≥ ℏ/2`) absolutely positioned at 0.04–0.05 opacity, Orbitron/mono, non-interactive, only on desktop (`hidden lg:block`).
- Ultra-subtle constellation SVG (dots + hairlines) at ≤0.05 opacity behind content areas.
- No horizontal overflow: all positioned elements use `overflow-hidden` container.

## Layout & Navigation

### Root layout (`src/app/layout.tsx`)

- `<html lang="es">` with the four font variables; `<body>`: `bg-space-black text-stellar-white font-sans` (Inter).
- Compose: `<a href="#contenido">` skip-link → `CosmicBackground` → `Navbar` → `<main id="contenido">` → `Footer`.
- `metadata`: Spanish title/description ("Willyb0t — Portafolio"). Separate **`viewport` export** with `themeColor: '#000816'` (Next 16 requires it outside `metadata`).
- Fix current bug: layout applies Orbitron to `<body>` and Inter to `<html>` — inverted; Inter must be the body font.

### Navbar (rewrite)

- Fixed top, `backdrop-blur`, `bg-black/50`, border-bottom hairline.
- **Desktop (≥768px)**: logo left ("✦ Willyb0t", Orbitron), 7 inline links right; active route = cyan text + 2px cyan underline (via `usePathname`).
- **Mobile (<768px)**: two rows — row 1: logo; row 2: the 7 links in a horizontally **scrollable tab row** (`overflow-x-auto`, hidden scrollbar utility, `scroll-smooth`), active tab underlined cyan, each link ≥48px touch target, `aria-current="page"` on active.
- Labels (Spanish): **Inicio, Sobre mí, Portafolio, Habilidades, Experiencia, Educación, Contacto**.
- No hamburger, no hidden menu (`claude.md`).

### Footer

- Hairline top border; `© {year} Willyb0t` + one-line Spanish tagline. Remove dead `#` links (Privacy/Terms/Accessibility point nowhere).

## Pages & Content

All section copy moves to centralized data so the user can edit without touching components:

- `src/data/navigation.ts` — route/label pairs.
- `src/data/content.ts` — hero, stats, feature cards, bio paragraphs, experience entries, education entries, skill categories, contact labels/messages (all Spanish).
- `src/data/projects.ts` — keep 5 real projects; translate `description` fields to Spanish; keep `id`, `title`, `githubUrl`, `liveUrl`, `technologies` as-is. `image` fields stay (no images ship; see ProjectCard below — no placeholder/stock images per `claude.md`).

### Home (`/`)

1. **Hero**: Orbitron display name, Spanish tagline, two CTAs (Sobre mí → `/about`, Ver proyectos → `/portfolio`), orbital system as centerpiece below CTAs.
2. **Stats**: 4 stat blocks (Orbitron numerals in `electric-blue`, label uppercase tracking-wide) — values from `content.ts`.
3. **Feature cards**: 3 `GlassmorphismCard`s (Observatorio interactivo / Rendimiento optimizado / Precisión científica).
4. Framer Motion staggered entrance (fade + 12px rise, 100–150ms stagger).

### Sobre mí (`/about`)

Bio (3 paragraphs), Experiencia profesional (3 timeline entries), Habilidades técnicas (3 category grid) — same structure as today, data-driven from `content.ts`.

### Portafolio (`/portfolio`)

- **Fix filters**: lift `selectedFilter` state into a client `PortfolioClient` wrapper so `ProjectFilters` actually filters `ProjectGrid` (currently state is local and dead).
- **Fix grid**: single `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` (current markup nests a classless div — renders stacked).
- **ProjectCard**: replace "Image Preview" gray box with a styled cosmic placeholder (gradient + constellation glyph + project initial — not a stock image, per `claude.md`); keep FEATURED badge ("DESTACADO"), tech chips, GitHub/Demo links.
- Card entrance: `whileInView` fade-up, viewport `once: true`.

### Habilidades (`/skills`)

Tech breakdown from project usage (existing `SkillsDetail` logic preserved) + the 3 skill categories; Spanish headings.

### Experiencia (`/experience`)

Timeline layout (vertical hairline + node dots) with the 3 existing entries incl. achievements/technologies lists, from `content.ts`.

### Educación (`/education`)

The 2 existing degrees with coursework and thesis lines, from `content.ts`.

### Contacto (`/contact`)

- Form (nombre, email, asunto, mensaje) with Spanish labels/placeholders, glass inputs, cyan focus ring.
- Simulated async submit (1.5s) → Spanish success/error banner. Submit button `type="submit"` inside the form (currently a `type="button"` workaround); loading state "Enviando…".
- Keep client-side only; no backend in scope.

## Motion & Interaction (Framer Motion)

- Add `framer-motion@^12`; import from `framer-motion` (stable API for React 19).
- Global `<MotionConfig reducedMotion="user">` wrapper (client) in layout.
- Reveals: `initial={{ opacity: 0, y: 12 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: '-80px' }}`, duration 0.4–0.5s, 100–200ms stagger where spec'd. Encapsulated in a small `Reveal` client component to keep pages as Server Components where possible.
- Page transitions: `template.tsx` with a simple crossfade (`initial opacity 0 → animate 1`, 250ms) — subtle, per spec.
- Hover states remain CSS (immediate feedback): glow intensify, lift, color shift.
- No complex scroll paths, no parallax (spec).

## Performance

- Starfield canvas is the only rAF loop; comets capped (3 desktop/1 mobile); stars capped 100.
- Orbital systems: pure CSS (`transform`/`opacity` only, GPU-composited).
- `prefers-reduced-motion`: static starfield, orbit/pulse/reveal animations disabled (global CSS media query + `MotionConfig`).
- Fonts self-hosted via `next/font` with `display: 'swap'`; preloaded automatically.
- No stock/remote images; `next/image` reserved for future real project shots.
- Route-based code splitting comes free with App Router; Framer Motion loaded only where used (client components).

## Accessibility (WCAG 2.1 AA)

- `lang="es"`; semantic landmarks (`header/nav/main/footer`); one `<h1>` per page via fixed `Typography`.
- Skip-link "Saltar al contenido" (visible on focus).
- Nav: `aria-current="page"`; tab row keyboard-scrollable.
- Contrast: `stellar-white` on `space-black` ≈ 17:1; `electric-blue` (#00b4d8) on black ≈ 8.6:1 — both pass AA. `space-gray` used only for large/secondary text — verify 4.5:1 on glass backgrounds, darken if short.
- Focus-visible cyan rings on all interactive elements.
- All decorative layers `aria-hidden="true"`, `pointer-events-none`.
- Layout tolerates 200% text zoom without horizontal scroll (grid layouts, no fixed widths).

## File-by-file Rewrite Map

| File | Action |
|---|---|
| `next.config.js`, `postcss.config.mjs`, `package-lock.json` | **Delete** |
| `next.config.ts` | Remove `images.domains` |
| `package.json` | Fix scripts, add `framer-motion` |
| `src/app/globals.css` | Rewrite: single `@layer base`, scrollbar, reduced-motion, no-scrollbar utility, selection color |
| `src/app/layout.tsx` | Rewrite per Layout section (fonts, lang, viewport export, structure) |
| `src/app/template.tsx` | **New**: page crossfade |
| `src/app/page.tsx` + `src/components/home/{HeroSection,StatsSection,FeaturesSection}.tsx` | Rewrite/​**new** (home sections don't exist yet) |
| `src/app/{about,portfolio,skills,experience,education,contact}/page.tsx` | Rewrite: drop per-page `StarfieldBackground` (moves to layout), data-driven sections |
| `src/components/background/CosmicBackground.tsx` | **New**: composed background (starfield + orbitals + formulas) |
| `src/components/background/StarfieldBackground.tsx` | Rewrite per Layer 1 (props, comets, leaks, HiDPI, visibility pause, reduced motion) |
| `src/components/orbital/OrbitalSystem.tsx` | Rewrite per Layer 2 (configurable) |
| `src/components/layout/{Navbar,Footer,MainLayout}.tsx` | Rewrite (scrollable tabs nav; MainLayout folded into root layout, then deleted) |
| `src/components/ui/{GlassmorphismCard,Typography,Button}.tsx` | Fix/rewrite (named export, semantic tags, `type` prop) |
| `src/components/ui/Reveal.tsx`, `MotionProvider.tsx` | **New**: FM wrappers |
| `src/components/{about,project,skills,experience,education,contact}/*.tsx` | Rewrite: data-driven, Spanish, filters/grid fixes, cosmic project placeholder |
| `src/data/{navigation.ts,content.ts}` | **New**; `projects.ts` descriptions → Spanish |
| `README.md`, `claude.md` | Update to match reality (Next 16, pnpm, Spanish UI) |

## Verification

1. `pnpm install` clean; `pnpm build` passes (Turbopack), `pnpm lint` passes (ESLint flat config).
2. Manual sweep of all 7 routes at 390px / 768px / 1440px: no horizontal scroll, visuals per spec, filters work, form states work.
3. Reduced-motion emulation: starfield static, reveals instant.
4. Keyboard-only navigation pass on every page.
5. Commit per implementation phase (cleanup → system → background → pages → polish).

## Out of Scope

- Backend for the contact form (simulated submit only).
- Real project screenshots/images (cosmic placeholder until user adds real ones).
- i18n routing (`/en`, `/es`) — single Spanish locale.
- Blog, CMS, analytics, SEO beyond basic metadata.
