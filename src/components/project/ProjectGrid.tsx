import ProjectCard from '@/components/project/ProjectCard';
import { Project } from '@/data/projects';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  // In a real implementation, we would filter projects based on selected filter
  // For now, we'll show all projects
  const filteredProjects = projects;

  return (
    <div className="grid gap-6">
      <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}