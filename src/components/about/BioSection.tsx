import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function BioSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 mb-16">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        About Me
      </Typography>
      <GlassmorphismCard className="mb-8">
        <Typography variant="body1" color="white" align="left" className="space-y-4">
          <p>
            Passionate about the intersection of physics and technology, I specialize in creating
            interactive experiences that make complex concepts accessible and engaging.
          </p>
          <p>
            My background in physics gives me a unique perspective on problem-solving, allowing me
            to approach software development with analytical thinking and creative intuition.
          </p>
          <p>
            When I am not coding, you can find me exploring astronomical phenomena, reading about
            quantum mechanics, or experimenting with new ways to visualize scientific concepts.
          </p>
        </Typography>
      </GlassmorphismCard>
    </section>
  );
}
