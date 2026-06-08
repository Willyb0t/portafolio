import MainLayout from '@/components/layout/MainLayout';
import StarfieldBackground from '@/components/background/StarfieldBackground';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <MainLayout>
      <StarfieldBackground
        starCount={60}
        enableCursorInteraction={false}
        enableComets={false}
      />
      <section className="relative z-10 pt-20 pb-16">
        <ContactForm />
      </section>
    </MainLayout>
  );
}