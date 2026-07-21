import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { aboutPageContent, skillCategories } from '@/data/content';

export default function SkillsSection() {
  return (
    <section aria-labelledby="about-skills-title">
      <Reveal>
        <Typography variant="h2" color="accent" align="center" className="mb-8" id="about-skills-title">
          {aboutPageContent.skillsTitle}
        </Typography>
      </Reveal>
      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-3">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <Typography variant="h3" color="accent" align="center" className="mb-3">
                  {category.title}
                </Typography>
                <ul className="flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-stellar-white/85"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
