import ProjectCard from '@/components/project/ProjectCard';
import Reveal from '@/components/ui/Reveal';
import { Project } from '@/data/projects';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <li key={project.id} className="h-full">
          <Reveal delay={(index % 3) * 0.1} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
