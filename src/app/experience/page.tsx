import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import ExperienceTimeline from '@/components/experience/ExperienceTimeline';

export default function ExperiencePage() {
  return (
    <MainLayout>
      <StarfieldBackground
        starCount={60}
        enableCursorInteraction={false}
        enableComets={false}
      />
      <section className="relative z-10 pt-20 pb-16">
        <ExperienceTimeline />
      </section>
    </MainLayout>
  );
}