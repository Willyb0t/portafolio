import type { Metadata } from 'next';
import PortfolioClient from '@/components/project/PortfolioClient';
import { Typography } from '@/components/ui/Typography';
import Reveal from '@/components/ui/Reveal';
import { portfolioContent } from '@/data/content';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Portafolio — Willyb0t',
  description: 'Proyectos de Willyb0t: simulación cuántica, pipelines de datos, IoT y más.',
};

export default function PortfolioPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-24">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-8">
          {portfolioContent.title}
        </Typography>
      </Reveal>
      <PortfolioClient projects={projects} />
    </div>
  );
}
