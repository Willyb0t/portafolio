import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { educationEntries, educationPageContent } from '@/data/content';

export default function EducationSection() {
  return (
    <section aria-labelledby="education-title" className="mx-auto max-w-4xl">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-12" id="education-title">
          {educationPageContent.title}
        </Typography>
      </Reveal>
      <div className="space-y-6">
        {educationEntries.map((entry, index) => (
          <Reveal key={entry.degree} delay={index * 0.1}>
            <GlassmorphismCard className="p-6 md:p-8">
              <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <Typography variant="body1" color="accent" className="font-semibold">
                  {entry.period}
                </Typography>
                <div>
                  <Typography variant="h2">{entry.degree}</Typography>
                  <Typography variant="body1" color="secondary">
                    {entry.institution}
                  </Typography>
                  <Typography variant="body1" className="mt-3 font-semibold">
                    {educationPageContent.courseworkLabel}
                  </Typography>
                  <Typography variant="body1" className="text-stellar-white/85">
                    {entry.coursework}
                  </Typography>
                  <Typography variant="body1" className="mt-3 font-semibold">
                    {educationPageContent.thesisLabel}
                  </Typography>
                  <Typography variant="body1" className="text-stellar-white/85">
                    {entry.thesis}
                  </Typography>
                </div>
              </div>
            </GlassmorphismCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
