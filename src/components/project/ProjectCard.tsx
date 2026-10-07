import Link from 'next/link';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { portfolioContent } from '@/data/content';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassmorphismCard className="flex h-full flex-col p-5">
      {project.featured && (
        <span className="absolute right-3 top-3 z-10 rounded bg-cosmic-pink/20 px-2 py-1 text-xs font-semibold text-cosmic-pink">
          {portfolioContent.featured}
        </span>
      )}

      {/* Cosmic placeholder (real screenshots can replace this later) */}
      <div
        aria-hidden="true"
        className="relative mb-4 h-36 overflow-hidden rounded-lg border border-white/[0.06] bg-gradient-to-br from-space-blue via-space-black to-vibrant-purple/30"
      >
        <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold text-white/[0.07]">
          {project.title.charAt(0)}
        </span>
        <span className="absolute left-3 top-2 h-1 w-1 rounded-full bg-stellar-white/40" />
        <span className="absolute bottom-3 left-1/3 h-0.5 w-0.5 rounded-full bg-stellar-white/30" />
        <span className="absolute bottom-6 right-4 h-1.5 w-1.5 rounded-full bg-electric-blue/40" />
        <span className="absolute right-3 top-3 text-electric-blue/50">✦</span>
      </div>

      <Typography variant="h2" className="mb-2">
        {project.title}
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-4 flex-1">
        {project.description}
      </Typography>

      <ul className="mb-4 flex flex-wrap gap-2" aria-label="Tecnologías">
        {project.technologies.map((tech) => (
          <li key={tech} className="rounded bg-white/5 px-2 py-1 text-xs text-stellar-white/80">
            {tech}
          </li>
        ))}
      </ul>

      <div className="flex gap-4">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-electric-blue transition-colors hover:text-stellar-white"
          >
            {portfolioContent.github}
          </Link>
        )}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-electric-blue transition-colors hover:text-stellar-white"
          >
          </Link>
        )}
      </div>
    </GlassmorphismCard>
  );
}
