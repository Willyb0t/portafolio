import type { Metadata } from 'next';
import EducationSection from '@/components/education/EducationSection';

export const metadata: Metadata = {
  title: 'Educación — Willyb0t',
  description: 'Formación académica de Willyb0t en física y ciencias de la computación.',
};

export default function EducationPage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <EducationSection />
    </div>
  );
}
