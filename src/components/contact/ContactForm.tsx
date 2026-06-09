'use client';

import { useState } from 'react';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function ContactForm() {
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    submitForm();
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      // In a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });

      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Contact Me
      </Typography>
      {submitStatus && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitStatus.type === 'success'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          <Typography variant="body1" color="white" align="left">
            {submitStatus.message}
          </Typography>
        </div>
      )}
      <GlassmorphismCard>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          <div>
            <Typography variant="body2" color="white" align="left" className="mb-2">
              Name
            </Typography>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/20 text-white border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <Typography variant="body2" color="white" align="left" className="mb-2">
              Email
            </Typography>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/20 text-white border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div>
            <Typography variant="body2" color="white" align="left" className="mb-2">
              Subject
            </Typography>
            <input
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/20 text-white border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="Subject of your message"
              required
            />
          </div>
          <div>
            <Typography variant="body2" color="white" align="left" className="mb-2">
              Message
            </Typography>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/20 text-white border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              rows={6}
              placeholder="Your message here..."
              required
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </GlassmorphismCard>
    </section>
  );
}