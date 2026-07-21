import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { aboutPageContent, experienceEntries } from '@/data/content';

export default function ExperienceSection() {
  return (
    <section aria-labelledby="about-experience-title" className="mb-16">
      <Reveal>
        <Typography variant="h2" color="accent" align="center" className="mb-8" id="about-experience-title">
          {aboutPageContent.experienceTitle}
        </Typography>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          <div className="space-y-8">
            {experienceEntries.map((entry) => (
              <article key={entry.period} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <Typography variant="body1" color="accent" className="font-semibold">
                  {entry.period}
                </Typography>
                <div>
                  <Typography variant="h3">{entry.role}</Typography>
                  <Typography variant="body1" color="secondary">
                    {entry.company}
                  </Typography>
                  <Typography variant="body1" className="mt-2 text-stellar-white/85">
                    {entry.summary}
                  </Typography>
                </div>
              </article>
            ))}
          </div>
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
