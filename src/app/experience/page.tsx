import type { Metadata } from 'next';
import ExperienceTimeline from '@/components/experience/ExperienceTimeline';

export const metadata: Metadata = {
  title: 'Experiencia — Willyb0t',
  description: 'Trayectoria profesional de Willyb0t como desarrollador.',
};

export default function ExperiencePage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <ExperienceTimeline />
    </div>
  );
}
