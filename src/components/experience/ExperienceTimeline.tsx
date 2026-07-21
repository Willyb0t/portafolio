import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { experienceEntries, experiencePageContent } from '@/data/content';

export default function ExperienceTimeline() {
  return (
    <section aria-labelledby="experience-title" className="mx-auto max-w-4xl">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-12" id="experience-title">
          {experiencePageContent.title}
        </Typography>
      </Reveal>
      <ol className="relative space-y-10 border-l-2 border-white/10 pl-8">
        {experienceEntries.map((entry, index) => (
          <li key={entry.period} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-electric-blue bg-space-black shadow-[0_0_12px_#00b4d8]"
            />
            <Reveal delay={index * 0.1}>
              <GlassmorphismCard className="p-6">
                <Typography variant="body1" color="accent" className="font-semibold">
                  {entry.period}
                </Typography>
                <Typography variant="h2" className="mt-1">
                  {entry.role}
                </Typography>
                <Typography variant="body1" color="secondary">
                  {entry.company}
                </Typography>
                <Typography variant="body1" className="mt-3 text-stellar-white/85">
                  {entry.summary}
                </Typography>
                {entry.achievements && (
                  <>
                    <Typography variant="body1" className="mt-4 font-semibold">
                      {experiencePageContent.achievementsLabel}
                    </Typography>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-stellar-white/85">
                      {entry.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </>
                )}
                {entry.technologies && (
                  <>
                    <Typography variant="body1" className="mt-4 font-semibold">
                      {experiencePageContent.technologiesLabel}
                    </Typography>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {entry.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-stellar-white/85"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </GlassmorphismCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
