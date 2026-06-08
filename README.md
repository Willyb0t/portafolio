# Willyb0t Portfolio

A modern, interactive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features an immersive space/observatory theme with interactive starfield, orbital systems, and smooth animations.

## Features

- **Interactive Starfield**: Cursor-reactive starfield with ripples and trailing effects
- **Orbital Systems**: Multiple orbiting celestial bodies with realistic physics
- **Modern UI**: Glassmorphism cards, smooth animations, and responsive design
- **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- **Performant**: Optimized for fast loading and smooth 60fps animations
- **Multi-page**: Home, About, Portfolio, Skills, Experience, Education, and Contact pages

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, CSS animations
- **Icons**: React Icons
- **Fonts**: Google Fonts (Orbitron, Inter, Space Grotesk)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the site

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable UI components
- `/src/components/layout` - Layout components (navbar, footer)
- `/src/components/background` - Starfield background system
- `/src/components/orbital` - Orbital system components
- `/src/components/ui` - Reusable UI components (buttons, cards, typography)
- `/src/components/home` - Home page specific components
- `/src/components/about` - About page specific components
- `/src/components/project` - Portfolio page components
- `/src/components/skills` - Skills page components
- `/src/components/experience` - Experience page components
- `/src/components/education` - Education page components
- `/src/components/contact` - Contact page components
- `/src/data` - Data files (projects, etc.)

## Accessibility

This site follows WCAG 2.1 AA guidelines:
- Proper color contrast ratios (minimum 4.5:1)
- Keyboard navigable interface
- Semantic HTML structure
- ARIA labels where needed
- Respects reduced motion preferences
- Focus visible indicators
- Skip navigation links

## Performance Optimizations

- Code splitting and lazy loading
- Image optimization with Next.js Image
- CSS and JavaScript minification
- Efficient animation techniques (requestAnimationFrame, CSS transforms)
- Limited particle counts based on device capability
- Asset optimization and compression

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the beauty of physics and the universe
- Built with passion for creating interactive experiences
- Thanks to the open-source community for amazing tools and libraries