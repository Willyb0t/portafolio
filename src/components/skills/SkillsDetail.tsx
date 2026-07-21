import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { skillsPageContent } from '@/data/content';
import { projects } from '@/data/projects';

export default function SkillsDetail() {
  const techCounts: Record<string, number> = {};
  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;
    });
  });

  const sortedTech = Object.entries(techCounts).sort(([, a], [, b]) => b - a);
  const maxCount = sortedTech[0]?.[1] ?? 1;

  return (
    <section aria-labelledby="skills-title" className="mx-auto max-w-4xl">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-4" id="skills-title">
          {skillsPageContent.title}
        </Typography>
        <Typography variant="body1" color="secondary" align="center" className="mb-8">
          {skillsPageContent.intro}
        </Typography>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          <Typography variant="h2" className="mb-6">
            {skillsPageContent.detailTitle}
          </Typography>
          <ul className="space-y-4">
            {sortedTech.map(([tech, count]) => (
              <li key={tech}>
                <div className="flex items-center justify-between gap-4">
                  <Typography variant="body1">{tech}</Typography>
                  <Typography variant="body1" color="accent">
                    {count} {count === 1 ? skillsPageContent.projectSingular : skillsPageContent.projectPlural}
                  </Typography>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-electric-blue"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
