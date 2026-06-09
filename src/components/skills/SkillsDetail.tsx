import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { projects } from '@/data/projects';

export default function SkillsDetail() {
  // Extract and count technologies from projects
  const techCounts: Record<string, number> = {};
  projects.forEach(project => {
    project.technologies.forEach(tech => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;
    });
  });

  const sortedTech = Object.entries(techCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tech]) => tech);

  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Technical Skills Detail
      </Typography>
      <GlassmorphismCard>
        <Typography variant="body1" color="white" align="left" className="space-y-4">
          <p>
            Below is a breakdown of the technologies I have worked with, based on project experience:
          </p>
          <div className="space-y-2">
            {sortedTech.map((tech, index) => (
              <div key={index} className="flex justify-between">
                <Typography variant="body2" color="white" align="left">
                  {tech}
                </Typography>
                <Typography variant="body2" color="accent" align="right">
                  {techCounts[tech]} projects
                </Typography>
              </div>
            ))}
          </div>
        </Typography>
      </GlassmorphismCard>
    </section>
  );
}
