import SkillsDetail from '@/components/skills/SkillsDetail';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Habilidades — Willyb0t',
  description: 'Tecnologías y habilidades técnicas de Willyb0t según su experiencia en proyectos.',
};

export default function SkillsPage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <SkillsDetail />
    </div>
  );
}
