'use client';

import { useEffect, useRef, useState } from 'react';

export default function StarfieldBackground({
  starCount = 80,
  enableCursorInteraction = true,
  enableComets = true,
  className = '',
}: {
  starCount?: number;
  enableCursorInteraction?: boolean;
  enableComets?: boolean;
  className?: string;
}) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const mouseMoveRef = useRef<(e: MouseEvent) => void | null>(null);

  useEffect(() => {
    // Create a simple starfield background
    const starsContainer = document.createElement('div');
    starsContainer.style.position = 'fixed';
    starsContainer.style.top = '0';
    starsContainer.style.left = '0';
    starsContainer.style.width = '100%';
    starsContainer.style.height = '100%';
    starsContainer.style.pointerEvents = 'none';
    starsContainer.style.zIndex = '-1';
    starsContainer.style.overflow = 'hidden';
    starsContainer.className = className;

    // Create stars
    const stars: HTMLDivElement[] = [];
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';

      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      // Random size
      const size = Math.random() * 3 + 0.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      // Random opacity
      star.style.opacity = `${Math.random() * 0.7 + 0.3}`;

      // Add twinkle animation
      star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`;

      starsContainer.appendChild(star);
      stars.push(star);
    }

    // Create comets if enabled
    const comets: HTMLDivElement[] = [];
    if (enableComets) {
      for (let i = 0; i < Math.max(2, starCount / 20); i++) {
        const comet = document.createElement('div');
        comet.style.position = 'fixed';
        comet.style.pointerEvents = 'none';
        comet.style.zIndex = '-1';
        comet.style.borderRadius = '50%';
        comet.style.backgroundColor = 'white';
        comet.style.width = '2px';
        comet.style.height = '2px';
        // Start off-screen
        comet.style.left = '-10px';
        comet.style.top = '-10px';
        comet.style.opacity = '0';
        starsContainer.appendChild(comet);
        comets.push(comet);
      }
    }

    document.body.appendChild(starsContainer);

    // Handle mouse movement for cursor interaction
    if (enableCursorInteraction) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      mouseMoveRef.current = handleMouseMove;
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animate comets based on mouse position
    let lastCometTime = 0;
    const animateComets = (timestamp: number) => {
      if (enableComets && mousePosition && timestamp - lastCometTime > 100) {
        // Create a comet effect towards mouse position
        const cometIndex = Math.floor(Math.random() * comets.length);
        const comet = comets[cometIndex];
        
        // Start from random edge
        let startX = 0;
        let startY = 0;
        const side = Math.floor(Math.random() * 4);
        const targetX = mousePosition.x;
        const targetY = mousePosition.y;
        
        switch (side) {
          case 0: // Top
            startX = Math.random() * window.innerWidth;
            startY = -10;
            break;
          case 1: // Right
            startX = window.innerWidth + 10;
            startY = Math.random() * window.innerHeight;
            break;
          case 2: // Bottom
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight + 10;
            break;
          case 3: // Left
            startX = -10;
            startY = Math.random() * window.innerHeight;
            break;
        }
        
        comet.style.left = `${startX}px`;
        comet.style.top = `${startY}px`;
        comet.style.opacity = '0.6';
        comet.style.width = '4px';
        comet.style.height = '4px';
        
        // Animate towards mouse
        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const duration = Math.max(500, distance / 2); // px/ms
        const startTime = timestamp;
        
        const animateComet = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          if (progress >= 1) {
            comet.style.opacity = '0';
            return;
          }
          
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentX = startX + dx * easeOut;
          const currentY = startY + dy * easeOut;
          const size = 4 * (1 - easeOut);
          
          comet.style.left = `${currentX}px`;
          comet.style.top = `${currentY}px`;
          comet.style.width = `${size}px`;
          comet.style.height = `${size}px`;
          comet.style.opacity = `${0.6 * (1 - easeOut)}`;
          
          requestAnimationFrame(animateComet);
        };
        
        requestAnimationFrame(animateComet);
        lastCometTime = timestamp;
      }
      
      if (mousePosition) {
        requestAnimationFrame(animateComets);
      }
    }

    // Cleanup
    return () => {
      starsContainer.remove();
      if (mouseMoveRef.current) {
        window.removeEventListener('mousemove', mouseMoveRef.current);
      }
    };
  }, [starCount, enableCursorInteraction, enableComets, className]);

  return <div className="absolute inset-0" aria-hidden="true" />;
}
