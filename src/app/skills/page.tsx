import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import SkillsDetail from '@/components/skills/SkillsDetail';

export default function SkillsPage() {
  return (
    <MainLayout>
      <StarfieldBackground
        starCount={60}
        enableCursorInteraction={false}
        enableComets={false}
      />
      <section className="relative z-10 pt-20 pb-16">
        <SkillsDetail />
      </section>
    </MainLayout>
  );
}