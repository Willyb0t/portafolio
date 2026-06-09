import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function EducationSection() {
  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Education
      </Typography>
      <GlassmorphismCard>
        <Typography variant="body1" color="white" align="left" className="space-y-4">
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2015-2019
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Bachelor of Science in Physics
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                University of Science and Technology
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Relevant coursework: Classical Mechanics, Electromagnetism, Quantum Mechanics, Thermodynamics, Mathematical Physics, Computer Programming for Scientists
              </Typography>
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Thesis:
              </Typography>
              <Typography variant="body1" color="white" align="left" className="ml-4">
                &quot;Applications of Quantum Computing in Cryptographic Systems&quot;
              </Typography>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2019-2021
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Master of Science in Computer Science
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                University of Science and Technology
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Relevant coursework: Advanced Algorithms, Machine Learning, Computer Graphics, Human-Computer Interaction, Software Engineering Principles
              </Typography>
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Thesis:
              </Typography>
              <Typography variant="body1" color="white" align="left" className="ml-4">
                &quot;Interactive Visualization Techniques for Complex Scientific Data&quot;
              </Typography>
            </div>
          </div>
        </Typography>
      </GlassmorphismCard>
    </section>
  );
}
