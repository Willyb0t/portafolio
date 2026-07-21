import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto — Willyb0t',
  description: 'Ponte en contacto con Willyb0t para proyectos y colaboraciones.',
};

export default function ContactPage() {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-24">
      <ContactForm />
    </div>
  );
}
