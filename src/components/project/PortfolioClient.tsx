'use client';

import { useMemo, useState } from 'react';
import ProjectFilters from './ProjectFilters';
import ProjectGrid from './ProjectGrid';
import { portfolioContent } from '@/data/content';
import { Project } from '@/data/projects';

interface PortfolioClientProps {
  projects: Project[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>(portfolioContent.allFilter);

  const filters = useMemo(() => {
    const allTechnologies = Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();
    return [portfolioContent.allFilter, ...allTechnologies];
  }, [projects]);

  const filteredProjects = useMemo(
    () =>
      selectedFilter === portfolioContent.allFilter
        ? projects
        : projects.filter((p) => p.technologies.includes(selectedFilter)),
    [projects, selectedFilter]
  );

  return (
    <>
      <ProjectFilters filters={filters} selected={selectedFilter} onSelect={setSelectedFilter} />
      <ProjectGrid projects={filteredProjects} />
    </>
  );
}
