import Link from 'next/link';
import OrbitalSystem from '@/components/orbital/OrbitalSystem';
import Reveal from '@/components/ui/Reveal';
import { hero } from '@/data/content';

const primaryCtaClasses =
  'rounded-lg bg-electric-blue px-6 py-3 text-base font-medium text-white transition-colors hover:bg-electric-blue/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-space-black';

const secondaryCtaClasses =
  'rounded-lg border border-electric-blue px-6 py-3 text-base font-medium text-electric-blue transition-colors hover:bg-electric-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-space-black';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center">
      <Reveal>
        <h1 className="font-display text-4xl font-bold tracking-wider text-stellar-white md:text-6xl">
          {hero.name}
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-xl text-base text-stellar-white/80">
          {hero.tagline}
          <br />
          <span className="text-electric-blue">{hero.subtitle}</span>
        </p>
      </Reveal>
      <Reveal delay={0.2} className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href={hero.primaryCta.href} className={primaryCtaClasses}>
          {hero.primaryCta.label}
        </Link>
        <Link href={hero.secondaryCta.href} className={secondaryCtaClasses}>
          {hero.secondaryCta.label}
        </Link>
      </Reveal>
      <Reveal delay={0.3} className="mt-14">
        <OrbitalSystem size={288} className="opacity-70" />
      </Reveal>
    </section>
  );
}
