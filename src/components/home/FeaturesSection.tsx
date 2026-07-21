import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import Reveal from '@/components/ui/Reveal';
import { features } from '@/data/content';

export default function FeaturesSection() {
  return (
    <section className="mt-16 grid w-full max-w-6xl gap-6 md:grid-cols-3">
      {features.map((feature, index) => (
        <Reveal key={feature.title} delay={index * 0.12} className="h-full">
          <GlassmorphismCard className="h-full p-6">
            <h2 className="font-display text-xl font-semibold text-electric-blue md:text-2xl">
              {feature.title}
            </h2>
            <p className="mt-3 text-base text-stellar-white/85">{feature.description}</p>
          </GlassmorphismCard>
        </Reveal>
      ))}
    </section>
  );
}
