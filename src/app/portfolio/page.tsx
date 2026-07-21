import ProjectFilters from '@/components/project/ProjectFilters';
import ProjectGrid from '@/components/project/ProjectGrid';
import { projects } from '@/data/projects';

export default function PortfolioPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-24">
      <h1 className="mb-8 text-center font-display text-3xl font-bold text-electric-blue md:text-4xl">
        Portafolio
      </h1>
      <ProjectFilters projects={projects} />
      <ProjectGrid projects={projects} />
    </div>
  );
}
