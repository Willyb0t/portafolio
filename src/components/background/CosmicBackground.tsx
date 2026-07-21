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
