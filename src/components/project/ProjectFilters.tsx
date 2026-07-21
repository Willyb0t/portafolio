import { Button } from '@/components/ui/Button';

interface ProjectFiltersProps {
  filters: string[];
  selected: string;
  onSelect: (filter: string) => void;
}

export default function ProjectFilters({ filters, selected, onSelect }: ProjectFiltersProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar proyectos por tecnología">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selected === filter ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onSelect(filter)}
          aria-pressed={selected === filter}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
