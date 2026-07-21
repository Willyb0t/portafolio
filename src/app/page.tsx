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
