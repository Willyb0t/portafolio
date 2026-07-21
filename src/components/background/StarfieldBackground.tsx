"use client";
import React, { useEffect, useRef } from 'react';

export interface StarfieldBackgroundProps {
  starCount?: number;
  enableCursorInteraction?: boolean;
  enableComets?: boolean;
  className?: string;
}

export default function StarfieldBackground({ className = '' }: StarfieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    interface Star {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      opacity: number;
      speed: number;
    }

    interface Comet {
      x: number;
      y: number;
      length: number;
      speedX: number;
      speedY: number;
    }

    let stars: Star[] = [];
    const comets: Comet[] = [];
    const mouse = { x: -1000, y: -1000 };

    // Inicializar estrellas respetando la densidad responsiva
    const initStars = () => {
      stars = [];
      const numStars = window.innerWidth > 1024 ? 100 : window.innerWidth > 768 ? 75 : 50;
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          speed: (Math.random() * 0.02) + 0.005
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const animate = () => {
      // Fondo: Pure black a deep space blue
      ctx.fillStyle = '#000816';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- RENDERIZAR ESTRELLAS ---
      stars.forEach(star => {
        // Efecto titilante
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0.2) star.speed = -star.speed;

        // Interacción con el cursor (Repeler / Wake effect)
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 120; // Radio de interacción

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          star.x -= (dx / distance) * force * 1.5;
          star.y -= (dy / distance) * force * 1.5;
        } else {
          // Retornar suavemente a su posición original
          star.x += (star.baseX - star.x) * 0.02;
          star.y += (star.baseY - star.y) * 0.02;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 249, 250, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });

      // --- RENDERIZAR COMETAS ---
      // 1% de probabilidad por frame, máximo 3 simultáneos
      if (Math.random() < 0.01 && comets.length < 3) {
        comets.push({
          x: Math.random() * canvas.width * 1.5, // Pueden nacer más a la derecha
          y: -50, // Nacen arriba fuera de la pantalla
          length: Math.random() * 60 + 40,
          speedX: Math.random() * 3 + 2,
          speedY: Math.random() * 3 + 2,
        });
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        
        // El cometa viaja hacia abajo a la izquierda
        comet.x -= comet.speedX;
        comet.y += comet.speedY;

        // Cálculo de la cola (opuesta al vector de velocidad)
        const tailX = comet.x + (comet.speedX * comet.length * 0.3);
        const tailY = comet.y - (comet.speedY * comet.length * 0.3);

        const gradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Cabeza opaca
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Cola transparente

        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Eliminar si sale de los límites (Collision detection bounds)
        if (comet.x < -100 || comet.y > canvas.height + 100) {
          comets.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    // Al salir de la pantalla, reiniciar cursor
    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('mouseout', () => {});
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`fixed inset-0 z-[-1] pointer-events-none ${className}`} />;
}