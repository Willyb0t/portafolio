'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { contactContent } from '@/data/content';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: FormState = { name: '', email: '', subject: '', message: '' };

const inputClasses =
  'w-full rounded-lg border border-gray-600/30 bg-gray-800/20 px-4 py-3 text-base text-white placeholder:text-stellar-white/40 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-electric-blue';

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulated send (no backend in scope)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus({ type: 'success', message: contactContent.success });
      setFormState(initialFormState);
    } catch {
      setSubmitStatus({ type: 'error', message: contactContent.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="contact-title" className="mx-auto max-w-4xl">
      <Reveal>
        <Typography variant="h1" color="accent" align="center" className="mb-8" id="contact-title">
          {contactContent.title}
        </Typography>
      </Reveal>

      {submitStatus && (
        <div
          role="status"
          className={`mb-6 rounded-lg border p-4 ${
            submitStatus.type === 'success'
              ? 'border-green-500/30 bg-green-500/20 text-green-400'
              : 'border-red-500/30 bg-red-500/20 text-red-400'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <Reveal delay={0.1}>
        <GlassmorphismCard className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-base text-stellar-white">
                {contactContent.fields.name.label}
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={inputClasses}
                placeholder={contactContent.fields.name.placeholder}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-base text-stellar-white">
                {contactContent.fields.email.label}
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={inputClasses}
                placeholder={contactContent.fields.email.placeholder}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-subject" className="mb-2 block text-base text-stellar-white">
                {contactContent.fields.subject.label}
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className={inputClasses}
                placeholder={contactContent.fields.subject.placeholder}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-base text-stellar-white">
                {contactContent.fields.message.label}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                className={inputClasses}
                rows={6}
                placeholder={contactContent.fields.message.placeholder}
                required
              />
            </div>
            <div className="flex justify-center pt-2">
              <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                {isSubmitting ? contactContent.sending : contactContent.submit}
              </Button>
            </div>
          </form>
        </GlassmorphismCard>
      </Reveal>
    </section>
  );
}
