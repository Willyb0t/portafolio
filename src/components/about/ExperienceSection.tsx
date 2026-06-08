import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function ExperienceSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 mb-16">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Professional Experience
      </Typography>
      <GlassmorphismCard>
        <Typography variant="body1" color="white" align="left" className="space-y-6">
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2023-Present
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Senior Frontend Developer
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                Tech Innovations Inc.
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Led development of interactive data visualization platform used by research institutions worldwide.
              </Typography>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2021-2023
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Full-Stack Developer
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                Science Labs LLC
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Built web applications for scientific research, including real-time particle simulation tools.
              </Typography>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Typography variant="h3" color="accent" align="left" className="w-20">
              2019-2021
            </Typography>
            <div>
              <Typography variant="h3" color="white" align="left">
                Junior Developer
              </Typography>
              <Typography variant="body2" color="secondary" align="left">
                Web Solutions Agency
              </Typography>
              <Typography variant="body1" color="white" align="left" className="mt-1">
                Developed responsive websites and web applications for various clients in education and nonprofit sectors.
              </Typography>
            </div>
          </div>
        </Typography>
      </GlassmorphismCard>
    </section>
  );
}