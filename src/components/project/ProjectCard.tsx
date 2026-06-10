import Link from 'next/link';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassmorphismCard className="h-full">
      {project.featured && (
        <div className="absolute top-2 right-2 bg-vibrant-purple/20 text-vibrant-purple px-2 py-1 rounded text-xs">
          FEATURED
        </div>
      )}
      <div className="relative h-48 mb-4">
        {/* In a real app, this would be an actual image */}
        <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
          <Typography variant="body2" color="secondary" align="center">
            Image Preview
          </Typography>
        </div>
      </div>
      <Typography variant="h3" color="accent" align="left" className="mb-2">
        {project.title}
      </Typography>
      <Typography variant="body2" color="white" align="left" className="mb-3">
        {project.description}
      </Typography>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span key={tech} className="bg-gray-700/30 text-xs px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-electric-blue hover:underline"
            >
              GitHub
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-electric-blue hover:underline"
            >
              Live Demo
            </Link>
          )}
        </div>
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            className="ml-4 text-sm text-electric-blue hover:underline"
          >
            View Project
          </Link>
        )}
      </div>
    </GlassmorphismCard>
  );
}
