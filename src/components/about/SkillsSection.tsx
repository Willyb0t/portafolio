import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function SkillsSection() {
  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Technical Skills
      </Typography>
      <GlassmorphismCard>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center">
            <Typography variant="h3" color="accent" align="center" className="mb-2">
              Frontend
            </Typography>
            <Typography variant="body2" color="white" align="left" className="space-y-1">
              • React • Next.js • TypeScript • Tailwind CSS<br/>
              • Framer Motion • CSS3 • HTML5 • JavaScript ES6+
            </Typography>
          </div>
          <div className="text-center">
            <Typography variant="h3" color="accent" align="center" className="mb-2">
              Backend
            </Typography>
            <Typography variant="body2" color="white" align="left" className="space-y-1">
              • Node.js • Python • REST APIs • GraphQL<br/>
              • PostgreSQL • MongoDB • Docker • AWS
            </Typography>
          </div>
          <div className="text-center">
            <Typography variant="h3" color="accent" align="center" className="mb-2">
              Physics & Math
            </Typography>
            <Typography variant="body2" color="white" align="left" className="space-y-1">
              • Classical Mechanics • Electromagnetism • Quantum Mechanics<br/>
              • Thermodynamics • Calculus • Linear Algebra • Differential Equations
            </Typography>
          </div>
        </div>
      </GlassmorphismCard>
    </section>
  );
}