import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import EducationSection from '@/components/education/EducationSection';

export default function EducationPage() {
  return (
    <MainLayout>
      <StarfieldBackground
        starCount={60}
        enableCursorInteraction={false}
        enableComets={false}
      />
      <section className="relative z-10 pt-20 pb-16">
        <EducationSection />
      </section>
    </MainLayout>
  );
}