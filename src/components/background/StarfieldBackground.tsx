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
    const comets: Comet[] = [];
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
