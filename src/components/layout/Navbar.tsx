'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navRoutes } from '@/data/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/50 backdrop-blur-md">
      <nav aria-label="Navegación principal" className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-wider text-stellar-white transition-colors hover:text-electric-blue md:text-xl"
          >
            <span aria-hidden="true" className="text-electric-blue">✦</span> Willyb0t
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 md:flex">
            {navRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-electric-blue text-electric-blue'
                        : 'border-transparent text-stellar-white/70 hover:text-stellar-white'
                    }`}
                  >
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile: horizontally scrollable tab row (no hamburger) */}
        <ul className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-1 md:hidden">
          {navRoutes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <li key={route.href} className="shrink-0">
                <Link
                  href={route.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[48px] items-center border-b-2 px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-electric-blue text-electric-blue'
                      : 'border-transparent text-stellar-white/70 hover:text-stellar-white'
                  }`}
                >
                  {route.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
