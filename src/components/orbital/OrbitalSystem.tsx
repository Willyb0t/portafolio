import { useEffect, useRef } from 'react';

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
}: {
  id?: string;
  centerX?: number;
  centerY?: number;
  radiusX?: number;
  radiusY?: number;
  speed?: number;
  planetColor?: string;
  planetSize?: number;
  trailLength?: number;
  className?: string;
}) {
  useEffect(() => {
    // Create a simple orbital system visualization
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    if (id) container.id = id;
    container.className = className;

    // Set container position (center of orbit)
    container.style.left = `${centerX}%`;
    container.style.top = `${centerY}%`;

    // Create orbit path (simplified as a circle)
    const path = document.createElement('div');
    path.style.position = 'absolute';
    path.style.border = `1px solid ${planetColor}`;
    path.style.borderRadius = '50%';
    path.style.width = `${radiusX * 2}px`;
    path.style.height = `${radiusY * 2}px`;
    path.style.opacity = '0.3';
    path.style.left = `-${radiusX}px`;
    path.style.top = `-${radiusY}px`;

    // Create planet (simplified as a dot)
    const planet = document.createElement('div');
    planet.style.position = 'absolute';
    planet.style.width = `${planetSize}px`;
    planet.style.height = `${planetSize}px`;
    planet.style.backgroundColor = planetColor;
    planet.style.borderRadius = '50%';
    planet.style.boxShadow = `0 0 10px rgba(0, 0, 0, 0.5)`;
    planet.style.left = `calc(50% - ${planetSize / 2}px)`;
    planet.style.top = `calc(50% - ${planetSize / 2}px)`;

    // Create trail points (simplified)
    const trailPoints: HTMLDivElement[] = [];
    for (let i = 0; i < trailLength; i++) {
      const trailPoint = document.createElement('div');
      trailPoint.style.position = 'absolute';
      trailPoint.style.width = `${planetSize * 0.6}px`;
      trailPoint.style.height = `${planetSize * 0.6}px`;
      trailPoint.style.backgroundColor = planetColor;
      trailPoint.style.borderRadius = '50%';
      trailPoint.style.opacity = `${0.3 * (1 - i / trailLength)}`;
      trailPoints.push(trailPoint);
    }

    // Assemble
    path.appendChild(planet);
    trailPoints.forEach((tp) => path.appendChild(tp));
    container.appendChild(path);

    document.body.appendChild(container);

    // Animation loop
    let angle = Math.random() * Math.PI * 2;
    const animate = () => {
      angle += speed;

      // Calculate planet position
      const planetX = Math.cos(angle) * radiusX;
      const planetY = Math.sin(angle) * radiusY;

      // Update planet position
      planet.style.left = `calc(50% + ${planetX}px)`;
      planet.style.top = `calc(50% + ${planetY}px)`;

      // Update trail points
      trailPoints.forEach((trailPoint, index) => {
        const trailAngle = angle - (index + 1) * 0.1;
        const trailRadius = radiusX * (1 - index / trailLength * 0.5);
        const trailX = Math.cos(trailAngle) * trailRadius;
        const trailY = Math.sin(trailAngle) * trailRadius * (radiusY / radiusX);

        trailPoint.style.left = `calc(50% + ${trailX}px)`;
        trailPoint.style.top = `calc(50% + ${trailY}px)`;
        trailPoint.style.opacity = `${0.3 * (1 - index / trailLength)}`;
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      container.remove();
    };
  }, [
    id,
    centerX,
    centerY,
    radiusX,
    radiusY,
    speed,
    planetColor,
    planetSize,
    trailLength,
    className,
  ]);

  return null; // Render nothing, elements managed in useEffect
}