export interface NavRoute {
  href: string;
  label: string;
}

export const navRoutes: NavRoute[] = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Sobre mí' },
  { href: '/portfolio', label: 'Portafolio' },
  { href: '/skills', label: 'Habilidades' },
  { href: '/experience', label: 'Experiencia' },
  { href: '/education', label: 'Educación' },
  { href: '/contact', label: 'Contacto' },
];
