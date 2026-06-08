import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import BioSection from '@/components/about/BioSection';
import ExperienceSection from '@/components/about/ExperienceSection';
import SkillsSection from '@/components/about/SkillsSection';

export default function AboutPage() {
  return (
    <MainLayout>
      <StarfieldBackground
        starCount={60}
        enableCursorInteraction={false}
        enableComets={false}
      />
      <section className="relative z-10 pt-20 pb-16">
        <BioSection />
        <ExperienceSection />
        <SkillsSection />
      </section>
    </MainLayout>
  );
}