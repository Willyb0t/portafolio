import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';
import { Typography } from '@/components/ui/Typography';

export default function ExperienceTimeline() {
  return (
    <section className="mx-auto max-w-4xl px-6">
      <Typography variant="h2" color="accent" align="center" className="mb-8">
        Experience Timeline
      </Typography>
      <GlassmorphismCard>
        <div className="space-y-6">
          {/* Experience items would be similar to AboutPage experience section */}
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
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Key achievements:
              </Typography>
              <ul className="list-disc list-inside space-y-1 mt-1 text-sm">
                <li>Reduced load times by 65% through code splitting and lazy loading</li>
                <li>Implemented real-time collaboration features using WebSockets</li>
                <li>Mentored 3 junior developers in React and TypeScript best practices</li>
              </ul>
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
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Technologies used:
              </Typography>
              <Typography variant="body2" color="white" align="left" className="ml-4">
                • React • Node.js • PostgreSQL • Docker • AWS
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
              <Typography variant="body2" color="white" align="left" className="mt-2">
                Technologies used:
              </Typography>
              <Typography variant="body2" color="white" align="left" className="ml-4">
                • HTML5 • CSS3 • JavaScript • PHP • WordPress
              </Typography>
            </div>
          </div>
        </div>
      </GlassmorphismCard>
    </section>
  );
}