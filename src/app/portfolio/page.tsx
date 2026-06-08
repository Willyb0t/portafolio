import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import ProjectFilters from '@/components/project/ProjectFilters';
import ProjectGrid from '@/components/project/ProjectGrid';
import { Typography } from '@/components/ui/Typography';
import { projects } from '@/data/projects';

export default function PortfolioPage() {
  return (
    <MainLayout>
      <StarfieldBackground
        starCount={70}
        enableCursorInteraction={true}
        enableComets={false}
      />
      <section className="relative z-10 pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <Typography variant="h2" color="accent" align="center" className="mb-8">
            Portfolio
          </Typography>
          <ProjectFilters projects={projects} />
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </MainLayout>
  );
}