'use client';

import { useEffect, useRef } from 'react';

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
    }

    document.body.appendChild(starsContainer);

    // Cleanup
    return () => {
      starsContainer.remove();
    };
  }, [starCount, enableCursorInteraction, enableComets, className]);

  return <div className="absolute inset-0" aria-hidden="true" />;
}