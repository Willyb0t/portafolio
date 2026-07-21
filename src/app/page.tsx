import FeaturesSection from '@/components/home/FeaturesSection';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';

export default function HomePage() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-28 md:pt-24">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </div>
  );
}
