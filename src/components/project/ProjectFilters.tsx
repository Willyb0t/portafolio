import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Project } from '@/data/projects';

interface ProjectFiltersProps {
  projects: Project[];
}

export default function ProjectFilters({ projects }: ProjectFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Extract unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(p => p.technologies))
  ).sort();

  const filters = ['All', ...allTechnologies];

  return (
    <div className="mb-8 flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selectedFilter === filter ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}