import { Typography } from '@/components/ui/Typography';

export default function Footer() {
  return (
    <footer className="border-t border-gray-600/30 mt-20 pt-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Typography variant="body2" color="secondary" align="center" className="mb-4">
          © {new Date().getFullYear()} Willyb0t. All rights reserved.
        </Typography>
        <div className="flex justify-center space-x-4 text-sm">
          <a href="#" className="text-secondary hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-secondary hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-secondary hover:text-white transition-colors">
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  );
}