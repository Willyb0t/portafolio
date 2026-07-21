import BioSection from '@/components/about/BioSection';
import ExperienceSection from '@/components/about/ExperienceSection';
import SkillsSection from '@/components/about/SkillsSection';

export default function AboutPage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <BioSection />
      <ExperienceSection />
      <SkillsSection />
    </div>
  );
}
