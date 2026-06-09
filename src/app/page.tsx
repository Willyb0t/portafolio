import OrbitalSystem from '@/components/orbital/OrbitalSystem';
import StarfieldBackground from '@/components/background/StarfieldBackground';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-space-black overflow-hidden">
      <StarfieldBackground className="absolute inset-0 -z-10" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8 px-4">
        <h1 className="text-4xl font-bold text-stellar-white">
          Willyb0t Portfolio
        </h1>
        <p className="text-xl text-space-gray max-w-md">
          Physics Enthusiast & Full-Stack Developer
        </p>
        <div className="flex space-x-4">
          <a href="/about" className="px-6 py-3 bg-electric-blue/20 hover:bg-electric-blue/30 text-electric-blue rounded-lg transition-colors border border-electric-blue/50">
            About Me
          </a>
          <a href="/portfolio" className="px-6 py-3 border border-stellar-white/20 hover:border-stellar-white/30 text-stellar-white rounded-lg transition-colors">
            Projects
          </a>
        </div>
        <OrbitalSystem className="mt-16 w-32 h-32" />
      </div>
    </div>
  );
}