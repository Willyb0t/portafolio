import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { bio } from '@/data/content';

export default function BioSection() {
  return (
    <section aria-labelledby="bio-title" className="mb-16">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-8" id="bio-title">
          {bio.title}
        </Typography>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          {bio.paragraphs.map((paragraph) => (
            <Typography key={paragraph.slice(0, 32)} variant="body1" className="mt-4 leading-relaxed text-stellar-white/90 first:mt-0">
              {paragraph}
            </Typography>
          ))}
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
