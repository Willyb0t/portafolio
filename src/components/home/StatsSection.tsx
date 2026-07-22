import Reveal from '@/components/ui/Reveal';
import { stats } from '@/data/content';

export default function StatsSection() {
  return (
    <section aria-label="Estadísticas" className="mt-16 w-full max-w-4xl">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1} className="text-center">
            <p className="font-display text-xl font-bold text-electric-blue md:text-2xl">{stat.value}</p>
            <p className="mt-1 text-base uppercase tracking-wider text-stellar-white/70">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
