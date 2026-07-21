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
