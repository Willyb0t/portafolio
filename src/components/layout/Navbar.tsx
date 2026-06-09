'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const routes = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/skills', label: 'Skills' },
    { href: '/experience', label: 'Experience' },
    { href: '/education', label: 'Education' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <a href="/" className="text-xl font-bold">
          Willyb0t
        </a>
      </div>
      <div className="hidden md:flex space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`text-sm font-medium text-stellar-white/70 hover:text-stellar-white transition-colors ${
              pathname === route.href
                ? 'border-b-2 border-electric-blue'
                : 'border-b-2 border-transparent'
            }`}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <button className="text-xl" aria-label="Open menu">
          {/* Hamburger icon - in a real implementation, this would open a mobile menu */}
        </button>
      </div>
    </nav>
  );
}